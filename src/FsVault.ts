import fs from "fs";
import { get, map } from "lodash/fp";
import path from "path";
import readdirp from "readdirp";

import { FsNode, VaultOptions } from "./types";

const fsp = fs.promises;

export class FsVault {
  root = "";
  currentDir = "/";

  index: string[] = [];
  contents: FsNode[] = [];

  /**
   * Return `this.cwd` as an absolute path
   */
  get cwd(): string {
    return this.joinRoot(this.currentDir);
  }

  constructor(options?: VaultOptions) {
    if (options && "root" in options) {
      const { resolve, normalize } = path;

      this.root = resolve(normalize(options.root));
    }
  }

  /**
   * Behaves the same way `cd` does, with `/` acting as `this.root`
   */
  cd(fspath = "/"): this {
    if (fspath.startsWith("/")) {
      this.currentDir = fspath;
    } else {
      this.currentDir = path.join(this.currentDir, fspath);
    }

    return this;
  }

  /**
   * Split a path into its pieces
   */
  split(filepath: string): string[] {
    return filepath.split(path.sep);
  }

  /**
   * Build a path from path pieces relative to `this.root`
   */
  joinRoot(...paths: string[]): string {
    return path.join(this.root, ...paths);
  }

  /**
   * Check if the given path is an absolute path
   */
  isAbsPath(filepath: string): boolean {
    return path.isAbsolute(filepath);
  }

  /**
   * Get the stats for a file
   */
  getStats(filepath: string): Promise<fs.Stats> {
    return fsp.lstat(filepath);
  }

  /**
   * Get a listing of all the files from `this.root`
   */
  getIndex(): Promise<string[]> {
    return this.readdirp(this.root);
  }

  /**
   * Rescan the vault for files and populate the index
   */
  async rebuildIndex(): Promise<string[]> {
    this.index = await this.getIndex();

    return this.index;
  }

  /**
   * Read a directory for files
   */
  public async readFile(node: FsNode): Promise<string> {
    if (node.isDirectory) {
      throw Error(
        "readFile must be given a FsNode where node.isFile === true"
      );
    }

    const buffer = await fsp.readFile(node.abspath);

    return buffer.toString();
  }

  /**
   * Read a directory for files
   */
  public async readdir(abspath: string): Promise<string[]> {
    if (!this.isAbsPath(abspath)) {
      throw Error("readdir must be given an absolute path");
    }

    const contents = map(entry => {
      return this.joinRoot(this.currentDir, entry);
    }, await fsp.readdir(abspath));

    // console.log(contents);

    return contents;
  }

  /**
   * Recusively read a directory for files
   */
  private async readdirp(abspath: string): Promise<string[]> {
    if (!this.isAbsPath(abspath)) {
      throw Error("readdirp must be given an absolute path");
    }

    return map(get("path"), await readdirp.promise(abspath));
  }
}
