import fs from "fs";
import map from "lodash/fp/map";
import path from "path";

import { cd, createFsNode, FsNode } from ".";

/**
 * Retrive all `FsNode` from the given node
 */
export async function ls(
  node: FsNode,
  relpath?: string
): Promise<FsNode[]> {
  const dest = relpath ? await cd(node, relpath) : node;

  const nodes = await Promise.all(
    map((entry: string) => {
      return createFsNode(dest, path.join(dest.abspath, entry));
    }, await fs.promises.readdir(dest.abspath))
  );

  return nodes;
}
