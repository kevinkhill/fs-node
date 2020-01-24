import { cd, FsNode, ls, noDotfiles, onlyFiles } from ".";

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
