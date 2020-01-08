import fs from "fs";
import isImage from "is-image";
import {
  any,
  filter,
  find,
  flow,
  get,
  includes,
  last,
  map,
  reject
} from "lodash/fp";
import path from "path";
import readdirp, { EntryInfo } from "readdirp";

import {
  getExt,
  isSetupNode,
  noDirs,
  noDotfiles,
  noFiles
} from "./lib";
import {
  FilterList,
  FsNode,
  GetFilesOptions,
  NwRequire,
  VaultOptions
} from "./types";

export class ProgramVault {
  root = "";
  currentDir = "/";

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

  /**
   * Return `this.cwd` as an absolute path
   */
  get cwd(): string {
    return this.joinRoot(this.currentDir);
  }

  constructor(options?: VaultOptions) {
    const windowExists = typeof window !== "undefined";

    if (windowExists && "nw" in window) {
      const nwRequire: NwRequire = get("nw.require", window);

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
  cd(fspath = "/"): this {
    if (fspath.startsWith("/")) {
      this.currentDir = fspath;
    } else {
      this.currentDir = this._path.join(this.currentDir, fspath);
    }

    return this;
  }

  /**
   * Get a listing of all the files from `this.root`
   */
  async getIndex(): Promise<string[]> {
    return map(file => file.path, await this.readdirp(this.root));
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
    return any(isSetupNode, await this.getDirs(relpath));
  }

  /**
   * Get the "SETUP_INFO" dir from `this.cwd`
   *
   * If `path` is given, then it will be used instead of `this.cwd`
   */
  async getSetupInfo(relpath?: string): Promise<FsNode[]> {
    if (relpath) this.cd(relpath);

    return (await this.hasSetupInfo())
      ? this.getContents("SETUP_INFO")
      : [];
  }

  // async getSelf(): Promise<FsNode> {
  //   const thisDir = last(this.cwd.split(this._path.sep));

  //   return find(
  //     (node: FsNode) => node.name === thisDir,
  //     await this.getContents("..")
  //   ) as FsNode;
  // }

  /**
   * Retrive a listing of all `FsNode` in `this.cwd`
   *
   * If `path` is given, then it will be used instead of `this.cwd`
   */
  async getContents(relpath?: string): Promise<FsNode[]> {
    if (relpath) this.cd(relpath);

    return flow([
      map((dirent: fs.Dirent) => this.createFsNode(dirent)),
      reject((node: FsNode) => includes(node.ext, this.blacklist.ext))
    ])(await this.readdir(this.cwd));
  }

  /**
   * Get a listing of all directory `FsNode` in `this.cwd`
   */
  async getDirs(relpath?: string): Promise<FsNode[]> {
    if (relpath) this.cd(relpath);

    return noFiles(await this.getContents());
  }

  /**
   * Get a listing of all the file `FsNode` in `this.cwd`
   *
   * Use the `{ dotfiles }` option to reveal `.*` files if needed
   */
  async getFiles(
    options: GetFilesOptions = { dotfiles: false }
  ): Promise<FsNode[]> {
    const files = noDirs(await this.getContents());

    if (options.dotfiles === false) {
      return noDotfiles(files);
    }

    if ("onlyExt" in options) {
      return filter(
        (node: FsNode) => node.ext === options.onlyExt,
        files
      );
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
   * Build a path from path pieces relative to `this.root`
   */
  private joinRoot(abspath: string): string {
    return this._path.join(this.root, abspath.replace(/^\//, ""));
  }

  /**
   * Build a path from path pieces relative to `this.cwd`
   */
  private joinPath(...paths: string[]): string {
    return this._path.join(this.cwd, ...paths);
  }

  /**
   * Create a new {@link FsNode} from a Dirent
   */
  private createFsNode(dirent: fs.Dirent): FsNode {
    const isFile = dirent.isFile();
    const isDirectory = dirent.isDirectory();
    const relpath = this._path.join(
      this.cwd.replace(this.root, ""),
      dirent.name
    );
    const abspath = this._path.join(
      this.root,
      this.joinPath(dirent.name)
    );
    const currentDir = last(this.cwd.split(this._path.sep));

    return {
      abspath,
      relpath,
      isFile,
      isDirectory,
      name: dirent.name,
      isImage: isImage(abspath),
      ext: getExt(dirent.name),
      dir: this._path.resolve(abspath.replace(dirent.name, "")),
      getSetupInfo: async (): Promise<FsNode[] | undefined> => {
        if (isDirectory) {
          const hasSetupInfo = any(
            isSetupNode,
            await this.getDirs(relpath)
          );

          if (hasSetupInfo) {
            return this.getContents("SETUP_INFO");
          }
        }
      },
      getContents: async (): Promise<string | FsNode[]> => {
        return isFile
          ? (await this._fs.readFile(abspath)).toString()
          : this.getContents(abspath);
      },
      getParent: async (): Promise<FsNode | undefined> => {
        return find(
          (node: FsNode) => node.name === currentDir,
          await this.getDirs("..")
        );
      }
    };
  }
}
