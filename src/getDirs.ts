import { cd, FsNode, ls, onlyDirs } from ".";

/**
 * Get a listing of all the file `FsNode` in `this.cwd`
 */
export async function getDirs(
  node: FsNode,
  relpath?: string
): Promise<FsNode[]> {
  const dest = relpath ? await cd(node, relpath) : node;

  const dirs = onlyDirs(await ls(dest));

  return dirs;
}
