import { ls } from "../fp";
import { FsNode, FsVault } from "../index";

export function getContents(
  node: FsNode
): Promise<string | FsNode[]> {
  return node.isFile
    ? getFileContents(node)
    : getFolderContents(node);
}

export async function getFileContents(node: FsNode): Promise<string> {
  if (!node.isFile) {
    throw Error(
      "getFileContents() can only operate on FsNodes that are files."
    );
  }

  try {
    const vault = FsVault.fromNode(node);
    const contents = await vault.readFile(node.abspath);

    return contents.toString();
  } catch (error) {
    return error.toString();
  }
}

export async function getFolderContents(
  node: FsNode
): Promise<FsNode[]> {
  const vault = FsVault.fromNode(node);

  return ls(vault);
}
