import { ls, readFile } from "../fp";
import { FsNode, FsVault } from "../index";

export function getContents(
  node: FsNode
): Promise<string | FsNode[]> {
  return node.isFile
    ? getFileContents(node)
    : getFolderContents(node);
}

async function getFileContents(node: FsNode): Promise<string> {
  if (!node.isFile) {
    throw Error(
      "getFileContents() can only operate on FsNodes that are files."
    );
  }

  try {
    return await readFile(node);
  } catch (error) {
    return error.toString();
  }
}

async function getFolderContents(node: FsNode): Promise<FsNode[]> {
  const vault = FsVault.fromNode(node);

  return ls(vault);
}
