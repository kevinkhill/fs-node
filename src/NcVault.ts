// import * as fs from "async-file";
import fs from "fs";
import _ from "lodash/fp";
import dir from "node-dir";
import path from "path";

import * as lib from "./lib";
import { FilterList, FsNode, NcVaultOptions } from "./types";

export class NcVault {
  root = NcVault.DEFAULT_ROOT;
  cwd = ".";

  whitelist: FilterList = {
    ext: ["nc", "mcam"]
  };

  blacklist: FilterList = {
    ext: []
  };

  index: string[] = [];

  private _path: typeof path;
  private _dir: typeof dir;

  static DEFAULT_ROOT = "C:\\PROGRAM VAULT";

  /**
   * Create a new NcVault
   */
  constructor(options?: NcVaultOptions) {
    const windowExists = typeof window === "undefined";

    this._path = windowExists
      ? path
      : (window as any).nw.require("path");

    this._dir = windowExists
      ? dir
      : (window as any).nw.require("node-dir");

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

  async ls(): Promise<FsNode[]> {
    return _.flow([
      _.map((dirent: fs.Dirent) => this.createFsNode(dirent)),
      _.reject((node: FsNode) =>
        _.includes(node.ext, this.blacklist.ext)
      )
    ])(await this.getDirent());
  }

  setRoot(rootPath: string): void {
    this.root = this.resolve(this.normalize(rootPath));
  }

  /**
   * Get the contents of `this.cwd` as `fs.Dirent[]`
   */
  async getDirent(): Promise<fs.Dirent[]> {
    return this.readCwd();
  }

  async getFiles(): Promise<FsNode[]> {
    return _.reject((node: FsNode) => {
      return node.isDirectory || node.name.startsWith(".");
    }, await this.ls());
  }

  /**
   * Get the contents of `this.cwd` as `FsNode[]`
   */
  // async getNodes(): Promise<FsNode[]> {
  // return Promise.all(_.map(FsNode.create, await this.ls()));
  // }

  async getIndex(): Promise<string[]> {
    await this.rebuildIndex();

    return this.index;
  }

  /**
   * Get all the files of `this.cwd` as `FsNode[]`
   */
  async rebuildIndex(): Promise<void> {
    this.index = await this._dir.promiseFiles(this.root);
  }

  /**
   * Get the contents of `this.cwd` as `fs.Dirent[]`
   */
  private readCwd(): Promise<fs.Dirent[]> {
    return fs.promises.readdir(this.cwd, {
      withFileTypes: true
    });
  }

  private getAbspath(dirent: fs.Dirent): string {
    // return fwdSlash(this._path.join(this.cwd, dirent.name));
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

  /**
   * Create an FsNode!
   *
   * @param dirent
   */
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
      path: this._path.resolve(abspath.replace(dirent.name, ""))
    };
  }
}
