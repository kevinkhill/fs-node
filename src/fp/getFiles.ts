import { FsNode, FsVault } from "..";
import { clone, ls, noDotfiles, onlyFiles } from "../fp";

/**
 * Get a listing of all the file `FsNode` in `this.cwd`
 *
 * Use the `{ dotfiles }` option to reveal `.*` files if needed
 */
// export async function getFiles(
//   vault: FsVault,
//   relpath?: string,
//   options = { dotfiles: false }
// ): Promise<FsNode[]> {
//   const $this = relpath ? clone(vault, relpath) : vault;
//   const files = onlyFiles(await ls($this));

//   if (options.dotfiles === false) {
//     return noDotfiles(files);
//   }

//   return files;
// }

export async function getFiles(
  node: FsNode,
  options = { dotfiles: false }
): Promise<FsNode[]> {
  const files = onlyFiles(await ls(node));

  if (options.dotfiles === false) {
    return noDotfiles(files);
  }

  return files;
}
