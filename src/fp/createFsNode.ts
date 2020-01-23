import fs from "fs";
import isImage from "is-image";
import path from "path";

import { FsNode, FsVault } from "../index";
import { getExt } from "../lib";
import { createVault, fromNode } from "./vault";

/**
 * Create a new {@link FsNode} from a Dirent
 */
// export async function createFsNode(
//   vault: FsVault,
//   abspath: string
// ): Promise<FsNode> {
//   if (!vault.isAbsPath(abspath)) {
//     throw Error("createFsNode() must be given an absolute path");
//   }

//   const stats = await vault.getStats(abspath);

//   const name = vault.split(abspath).pop();
//   const isFile = stats.isFile();
//   const isDirectory = stats.isDirectory();
//   const relpath = abspath.replace(vault.root, "");

//   return {
//     name,
//     relpath,
//     abspath,
//     isFile,
//     isDirectory,
//     isImage: isImage(abspath),
//     root: vault.root,
//     ext: getExt(name),
//     dir: vault.split(vault.cwd).pop()
//   };
// }

/**
 * @TODO move root the the 2nd param and make optional for a folder
 * so abspath can be a filename.
 */
export async function createFsNode(
  root: FsNode,
  abspath: string
): Promise<FsNode> {
  console.log(abspath);

  if (!path.isAbsolute(abspath)) {
    throw Error("createFsNode() must be given an absolute path");
  }

  const vault = fromNode(root);
  const stats = await fs.promises.lstat(abspath);

  const name = vault.split(abspath).pop();
  const isFile = stats.isFile();
  const isDirectory = stats.isDirectory();
  const relpath = abspath.replace(vault.root, "");

  return {
    name,
    relpath,
    abspath,
    isFile,
    isDirectory,
    isImage: isImage(abspath),
    root: vault.root,
    ext: getExt(name),
    dir: vault.split(vault.cwd).pop()
  };
}
