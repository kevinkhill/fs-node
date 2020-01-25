import fs from "fs";
import path from "path";

import { FsNode } from "./FsNode";

/**
 * Create a new {@link FsNode} from an absolute path
 *
 * If another node is given, then a new node will be
 * created from that node as the root and the path as
 * relative.
 */
export async function createNode(
  abspath: string,
  fromNode?: FsNode
): Promise<FsNode> {
  let name;

  if (path.isAbsolute(abspath)) {
    name = abspath.split(path.sep).pop();
  } else {
    name = abspath;
  }

  if (fromNode) {
    // console.log(fromNode, name);

    const stats = await fs.promises.lstat(abspath);

    return Object.freeze({
      name,
      ext: path.extname(name),
      relpath: abspath.replace(fromNode.root, ""),
      abspath,
      root: fromNode.root,
      isRoot: false,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    });
  }

  if (!path.isAbsolute(abspath)) {
    throw Error("root must be an absolute path");
  }

  return Object.freeze({
    name,
    abspath,
    relpath: "/",
    root: abspath,
    isRoot: true,
    isFile: false,
    isDirectory: true
  });
}
