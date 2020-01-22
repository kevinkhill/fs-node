import { ls } from "../fp";
import { FsNode, FsVault } from "../index";
import { noDotfiles, onlyFiles } from "../lib";

/**
 * Get a listing of all the file `FsNode` in `this.cwd`
 *
 * Use the `{ dotfiles }` option to reveal `.*` files if needed
 */
export async function getFiles(
  vault: FsVault,
  relpath?: string,
  options = { dotfiles: false }
): Promise<FsNode[]> {
  const $this = relpath ? vault.clone(relpath) : vault;
  const files = onlyFiles(await ls($this));

  if (options.dotfiles === false) {
    return noDotfiles(files);
  }

  return files;
}
