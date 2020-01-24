import fs from "fs";
import isImage from "is-image";
import path from "path";

import { FsNode } from ".";

/**
 * @TODO move root the the 2nd param and make optional for a folder
 * so abspath can be a filename.
 */
export async function createFsNode(
  rootNode: FsNode,
  abspath: string
): Promise<FsNode> {
  if (!path.isAbsolute(abspath)) {
    throw Error("createFsNode() must be given an absolute path");
  }

  console.log(abspath);

  const stats = await fs.promises.lstat(abspath);
  const name = abspath.split(path.sep).pop();

  return {
    name,
    ext: path.extname(name),
    relpath: abspath.replace(rootNode.root, ""),
    abspath,
    root: rootNode.root,
    isRoot: false,
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
    isImage: isImage(abspath)
    // dir: vault.split(vault.cwd).pop()
  };
}
