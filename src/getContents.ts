import { FsNode } from ".";
import { ls } from "./ls";
import { readFile } from "./readFile";

/**
 * Sugar function to handle either a file or dir node.
 */
export function getContents(
  node: FsNode
): Promise<string | FsNode[]> {
  return node.isFile ? readFile(node) : ls(node);
}
