import fs from "fs";
import isImage from "is-image";
import _ from "lodash/fp";
import path from "path";
import readdirp, { EntryInfo } from "readdirp";

import * as lib from "./lib";
import { FilterList, FsNode, NcVaultOptions } from "./types";

type NwRequire = (id: string) => any;

export class NcVault {
  root = "";
  cwd = "";

  whitelist: FilterList = {
    ext: ["nc", "mcam"]
  };

  blacklist: FilterList = {
    ext: []
  };

  index: string[] = [];

  private _path: typeof path;
  private _fs: typeof fs.promises;
  private _readdirp: typeof readdirp;

  constructor(options?: NcVaultOptions) {
    const windowExists = typeof window !== "undefined";

    if (windowExists && "nw" in window) {
      const nwRequire: NwRequire = _.get("nw.require", window);

      this._path = nwRequire("path");
      this._fs = nwRequire("fs").promises;
      this._readdirp = nwRequire("readdirp");
    } else {
      this._path = path;
      this._fs = fs.promises;
      this._readdirp = readdirp;
    }

    if (options && "root" in options) {
      this.setRoot(options.root);
    }

    this.cd();
  }

  /**
   * Set a new root directory for the vault
   */
  setRoot(rootPath: string): void {
    const { resolve, normalize } = this._path;

    this.root = resolve(normalize(rootPath));
  }

  /**
   * Behaves the same way `cd` does, with `/` acting as `this.root`
   */
  cd(path?: string): this {
    this.cwd = path ? this.joinCwd(path) : "/";

    return this;
  }

  /**
   * Return `this.cwd` as an absolute path
   */
  get absCwd(): string {
    return this._path.join(this.root, this.cwd);
  }

  /**
   * Get a listing of all the files from `this.root`
   */
  async getIndex(): Promise<string[]> {
    return _.map(file => file.path, await this.readdirp(this.root));
  }

  /**
   * Rescan the vault for files and populate the index
   */
  async rebuildIndex(): Promise<void> {
    this.index = await this.getIndex();
  }

  /**
   * Check if `this.cwd` has a "SETUP_INFO" folder inside
   *
   * If `path` is given, then it will be used instead of `this.cwd`
   */
  async hasSetupInfo(relpath?: string): Promise<boolean> {
    return _.any(
      (node: FsNode) => node.name === "SETUP_INFO",
      await this.getDirs(relpath)
    );
  }

  /**
   * Retrive a listing of all `FsNode` in `this.cwd`
   *
   * If `path` is given, then it will be used instead of `this.cwd`
   */
  async getNodes(relpath?: string): Promise<FsNode[]> {
    if (relpath) this.cd(relpath);

    return _.flow([
      _.map((dirent: fs.Dirent) => this.createFsNode(dirent)),
      _.reject((node: FsNode) =>
        _.includes(node.ext, this.blacklist.ext)
      )
    ])(await this.readdir(this.absCwd));
  }

  /**
   * Get a listing of all directory `FsNode` in `this.cwd`
   */
  async getDirs(relpath?: string): Promise<FsNode[]> {
    if (relpath) {
      this.cd(relpath);
    }

    return lib.noFiles(await this.getNodes());
  }

  /**
   * Get a listing of all the file `FsNode` in `this.cwd`
   *
   * Use the `{ dotfiles }` option to reveal `.*` files if needed
   */
  async getFiles(options = { dotfiles: false }): Promise<FsNode[]> {
    const files = lib.noDirs(await this.getNodes());

    if (options.dotfiles === false) {
      return lib.noDotfiles(files);
    }

    return files;
  }

  /**
   * Read a directory for files
   */
  private readdir(abspath: string): Promise<fs.Dirent[]> {
    if (!this._path.isAbsolute(abspath)) {
      throw Error("this.readdir must be given an absolute path");
    }

    return fs.promises.readdir(abspath, {
      withFileTypes: true
    });
  }

  /**
   * Recusively read a directory for files
   */
  private readdirp(abspath: string): Promise<EntryInfo[]> {
    if (!this._path.isAbsolute(abspath)) {
      throw Error("this.readdirp must be given an absolute path");
    }

    return this._readdirp.promise(abspath);
  }

  /**
   * Build an absolute path from path pieces relative to `this.cwd`
   */
  private joinCwd(...paths: string[]): string {
    return this._path.join(this.cwd, ...paths);
  }

  /**
   * Create a new {@link FsNode} from a Dirent
   */
  private createFsNode(dirent: fs.Dirent): FsNode {
    const isFile = dirent.isFile();
    const isDirectory = dirent.isDirectory();
    const abspath = this.joinCwd(dirent.name);
    const currentDir = _.last(this.cwd.split(this._path.sep));

    return {
      abspath,
      isFile,
      isDirectory,
      isImage: isImage(abspath),
      name: dirent.name,
      ext: lib.getExt(dirent.name),
      relpath: this._path.join(
        this.cwd.replace(this.root, ""),
        dirent.name
      ),
      dir: this._path.resolve(abspath.replace(dirent.name, "")),
      getContents: async () => {
        return isFile
          ? (await this._fs.readFile(abspath)).toString()
          : this.getNodes(abspath);
      },
      getParent: async () => {
        return _.find(
          (node: FsNode) => node.name === currentDir,
          await this.getDirs("..")
        );
      }
    };
  }
}
