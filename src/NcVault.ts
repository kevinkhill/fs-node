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
  cwd = ".";

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
    this.root = this._path.resolve(this._path.normalize(rootPath));
  }

  /**
   * Behaves the same way `cd` does, with `/` acting as `this.root`
   */
  cd(path?: string): this {
    this.cwd = path ? this._path.join(this.root, path) : this.root;

    return this;
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
   * Retrive a listing of all `FsNode` in `this.cwd`
   *
   * If `path` is given, then it will be used instead of `this.cwd`
   */
  async ls(path?: string): Promise<FsNode[]> {
    return _.flow([
      _.map((dirent: fs.Dirent) => this.createFsNode(dirent)),
      _.reject((node: FsNode) =>
        _.includes(node.ext, this.blacklist.ext)
      )
    ])(await this.readdir(this._path.resolve(path || this.cwd)));
  }

  /**
   * Get a listing of all directory `FsNode` in `this.cwd`
   */
  async getDirs(path?: string): Promise<FsNode[]> {
    return lib.noFiles(path ? await this.ls(path) : await this.ls());
  }

  /**
   * Get a listing of all the file `FsNode` in `this.cwd`
   *
   * Use the `{ dotfiles }` option to reveal `.*` files if needed
   */
  async getFiles(options = { dotfiles: false }): Promise<FsNode[]> {
    const files = lib.noDirs(await this.ls());

    if (options.dotfiles === false) {
      return lib.noDotfiles(files);
    }

    return files;
  }

  /**
   * Read a directory for files
   */
  private readdir(abspath: string): Promise<fs.Dirent[]> {
    return fs.promises.readdir(abspath, {
      withFileTypes: true
    });
  }

  /**
   * Recusively read a directory for files
   */
  private readdirp(abspath: string): Promise<EntryInfo[]> {
    return this._readdirp.promise(abspath);
  }

  /**
   * Create a new {@link FsNode} from a Dirent
   */
  private createFsNode(dirent: fs.Dirent): FsNode {
    const isFile = dirent.isFile();
    const isDirectory = dirent.isDirectory();
    const abspath = this._path.join(this.cwd, dirent.name);

    return {
      abspath,
      isFile,
      isDirectory,
      isImage: isImage(abspath),
      name: dirent.name,
      ext: lib.getExt(dirent.name),
      mime: lib.getMime(dirent.name),
      relpath: this._path.join(
        this.cwd.replace(this.root, ""),
        dirent.name
      ),
      dir: this._path.resolve(abspath.replace(dirent.name, "")),
      getContents: async () => {
        return isFile
          ? (await this._fs.readFile(abspath)).toString()
          : this.ls(abspath);
      }
    };
  }
}
