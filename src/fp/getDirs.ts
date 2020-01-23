import { FsNode, FsVault } from "..";
import { clone, ls, onlyDirs } from "../fp";

/**
 * Get a listing of all the file `FsNode` in `this.cwd`
 *
 * Use the `{ dotfiles }` option to reveal `.*` files if needed
 */
export async function getDirs(
  vault: FsVault,
  relpath?: string
): Promise<FsNode[]> {
  const $this = relpath ? clone(vault, relpath) : vault;

  const dirs = onlyDirs(await ls($this));

  return dirs;
}
