import { FsNode } from "..";
import { cd, ls, onlyDirs } from "../fp";

/**
 * Get a listing of all the file `FsNode` in `this.cwd`
 *
 * Use the `{ dotfiles }` option to reveal `.*` files if needed
 */
export async function getDirs(
  node: FsNode,
  relpath?: string
): Promise<FsNode[]> {
  const dest = relpath ? await cd(node, relpath) : node;

  const dirs = onlyDirs(await ls(dest));

  return dirs;
}
