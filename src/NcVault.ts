// import * as fs from "async-file";
import fs from "fs";
import _ from "lodash/fp";
import dir from "node-dir";
import path from "path";

import * as lib from "./lib";
import { FilterList, FsNode, NcVaultOptions } from "./types";

export class NcVault {
  static DEFAULT_ROOT = "C:\\PROGRAM VAULT";

  root = NcVault.DEFAULT_ROOT;
  cwd = ".";

  whitelist: FilterList = {
    ext: ["nc", "mcam"]
  };

  blacklist: FilterList = {
    ext: []
  };

  index: string[] = [];

  private _fs: typeof fs.promises;
  private _dir: typeof dir;
  private _path: typeof path;

  constructor(options?: NcVaultOptions) {
    const windowExists = typeof window === "undefined";

    if (windowExists) {
      const nw = (window as any).nw;
      const nwRequire = nw.require;

      this._fs = nwRequire("fs").promises;
      this._path = nwRequire("path");
      this._dir = nwRequire("node-dir");
    } else {
      this._fs = fs.promises;
      this._path = path;
      this._dir = dir;
    }

    if (options && "root" in options) {
      this.setRoot(options.root);
    }

    this.cd();
    this.rebuildIndex();
  }

  cd(path?: string): this {
    this.cwd = path ? this.join(this.root, path) : this.root;

    return this;
  }

  setRoot(rootPath: string): void {
    this.root = this.resolve(this.normalize(rootPath));
  }

  async getIndex(): Promise<string[]> {
    await this.rebuildIndex();

    return this.index;
  }

  async ls(path?: string): Promise<FsNode[]> {
    return _.flow([
      _.map((dirent: fs.Dirent) => this.createFsNode(dirent)),
      _.reject((node: FsNode) =>
        _.includes(node.ext, this.blacklist.ext)
      )
    ])(await this.readPath(path || this.cwd));
  }

  async getFiles(options = { dotfiles: false }): Promise<FsNode[]> {
    const files = lib.noDirs(await this.ls());

    if (options.dotfiles === false) {
      return lib.noDotfiles(files);
    }

    return files;
  }

  async getDirs(): Promise<FsNode[]> {
    return lib.noFiles(await this.ls());
  }

  async rebuildIndex(): Promise<void> {
    this.index = await this._dir.promiseFiles(this.root);
  }

  private readCwd(): Promise<fs.Dirent[]> {
    return this.readPath(this.cwd);
  }

  private readPath(path: string): Promise<fs.Dirent[]> {
    return fs.promises.readdir(path, {
      withFileTypes: true
    });
  }

  private getAbspath(dirent: fs.Dirent): string {
    return this.join(this.cwd, dirent.name);
  }

  private normalize(path: string): string {
    return this._path.normalize(path);
  }

  private resolve(...pathSegments: string[]): string {
    return this._path.resolve(...pathSegments);
  }

  private join(...pathSegments: string[]): string {
    return this._path.resolve(this._path.join(...pathSegments));
  }

  private createFsNode(dirent: fs.Dirent): FsNode {
    const isFile = dirent.isFile();
    const isDirectory = dirent.isDirectory();
    const abspath = this.getAbspath(dirent);

    return {
      abspath,
      isFile,
      isDirectory,
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
          : null;
        // if (isDirectory) return this.ls(abspath);
      }
    };
  }
}
