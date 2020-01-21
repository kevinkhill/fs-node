import fs from "fs";
import { clone, find, get, map } from "lodash/fp";
import path from "path";
import readdirp, { EntryInfo } from "readdirp";

import { getDirs, ls } from "./fp";
import { hasSetupNode, mapPath } from "./lib";
import { FilterList, FsNode, NwRequire, VaultOptions } from "./types";

export class FsVault {
  root = "";
  currentDir = "/";

  whitelist: FilterList = {
    ext: ["nc", "mcam"]
  };

  blacklist: FilterList = {
    ext: []
  };

  index: string[] = [];
  contents: FsNode[] = [];
  options: {
    dotfiles: false;
  };

  private _path: typeof path;
  private _fs: typeof fs.promises;
  private _readdirp: typeof readdirp;

  /**
   * Return `this.cwd` as an absolute path
   */
  get cwd(): string {
    return this.joinRoot(this.currentDir);
  }

  static create(root: string): FsVault {
    return new FsVault({ root });
  }

  static fromNode(node: FsNode): FsVault {
    const vault = FsVault.create(node.root);

    vault.cd(node.relpath);

    return vault;
  }

  constructor(options?: VaultOptions) {
    if (typeof window !== "undefined" && "nw" in window) {
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

  split(filepath: string): string[] {
    return filepath.split(this._path.sep);
  }

  /**
   * Clones the vault at the given relative path
   */
  chroot(relpath?: string): FsVault {
    const vault = FsVault.create(this.cwd);

    vault.cd(relpath);

    return vault;
  }

  isAbsPath(filepath: string): boolean {
    return this._path.isAbsolute(filepath);
  }

  /**
   * Set a new root directory for the vault
   */
  setRoot(rootPath: string): void {
    const { resolve, normalize } = this._path;

    this.root = resolve(normalize(rootPath));
  }

  getStats(filepath: string): Promise<any> {
    return this._fs.lstat(filepath);
  }

  /**
   * Get a listing of all the files from `this.root`
   */
  async getIndex(): Promise<string[]> {
    return mapPath(await this.readdirp(this.root));
  }

  /**
   * Rescan the vault for files and populate the index
   */
  async rebuildIndex(): Promise<void> {
    this.index = await this.getIndex();
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

    // this.ls().then(contents => (this.contents = contents));

    return this;
  }

  /**
   * Read a directory for files
   */
  public async readdir(abspath: string): Promise<string[]> {
    if (!this._path.isAbsolute(abspath)) {
      throw Error("readdir must be given an absolute path");
    }

    const contents = map(entry => {
      return this.joinRoot(this.currentDir, entry);
    }, await this._fs.readdir(abspath));

    // console.log(contents);

    return contents;
  }

  /**
   * Recusively read a directory for files
   */
  private readdirp(abspath: string): Promise<EntryInfo[]> {
    if (!this._path.isAbsolute(abspath)) {
      throw Error("readdirp must be given an absolute path");
    }

    return this._readdirp.promise(abspath);
  }

  /**
   * Build a path from path pieces relative to `this.root`
   */
  private joinRoot(...paths: string[]): string {
    return this._path.join(this.root, ...paths);
  }

  /**
   * Build a path from path pieces relative to `this.cwd`
   */
  private joinCwd(...paths: string[]): string {
    return this._path.join(this.cwd, ...paths);
  }
}
