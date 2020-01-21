import isImage from "is-image";

import { FsNode, FsVault } from "../index";
import { getExt } from "../lib";

/**
 * Create a new {@link FsNode} from a Dirent
 */
export async function createFsNode(
  vault: FsVault,
  abspath: string
): Promise<FsNode> {
  if (!vault.isAbsPath(abspath)) {
    throw Error("createFsNode() must be given an absolute path");
  }

  const stats = await vault.getStats(abspath);

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
