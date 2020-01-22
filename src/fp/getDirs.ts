import { ls } from "../fp";
import { FsNode, FsVault } from "../index";
import { onlyDirs } from "../lib";

/**
 * Get a listing of all the file `FsNode` in `this.cwd`
 *
 * Use the `{ dotfiles }` option to reveal `.*` files if needed
 */
export async function getDirs(
  vault: FsVault,
  relpath?: string
): Promise<FsNode[]> {
  const $this = relpath ? vault.clone(relpath) : vault;

  const dirs = onlyDirs(await ls($this));

  return dirs;
}
