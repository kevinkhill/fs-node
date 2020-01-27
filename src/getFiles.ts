import { FsNode } from ".";
import { cd } from "./cd";
import { onlyFiles } from "./filters";
import { ls } from "./ls";
import { noDotfiles } from "./rejects";

/**
 * Sugar function to get only files from a node
 *
 * Provides the option to inlcude dotfiles
 */
export async function getFiles(
  node: FsNode,
  relpath?: string,
  options = { dotfiles: false }
): Promise<FsNode[]> {
  const dest = relpath ? await cd(node, relpath) : node;

  const files = onlyFiles(await ls(dest));

  if (options.dotfiles === false) {
    return noDotfiles(files);
  }

  return files;
}
