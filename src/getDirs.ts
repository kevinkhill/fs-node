import { FsNode } from "./FsNode";
import { cd } from "./cd";
import { onlyDirs } from "./filters";
import { ls } from "./ls";

/**
 * Sugar function to get only dir nodes
 */
export async function getDirs(
  node: FsNode,
  relpath?: string
): Promise<FsNode[]> {
  const dest = relpath ? await cd(node, relpath) : node;

  const dirs = onlyDirs(await ls(dest));

  return dirs;
}
