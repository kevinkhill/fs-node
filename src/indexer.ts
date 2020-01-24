import fs from "fs";
import map from "lodash/fp/map";
import path from "path";
import readdirp from "readdirp";

import { FsNode } from "./FsNode";

/**
 * Scan a node for files and return a list of paths
 */
export async function scan(node: FsNode): Promise<string[]> {
  return map(entry => {
    return path.join(this.currentDir, entry);
  }, await fs.promises.readdir(node.abspath));
}

/**
 * Recusively scan a node for files
 */
export async function crawl(node: FsNode): Promise<string[]> {
  return map("path", await readdirp.promise(node.abspath));
}
