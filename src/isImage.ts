import { FsNode } from ".";

export const IMG_EXTENSIONS = new Set(["png", "jpg", "bmp", "gif"]);

export function isImage(node: FsNode): boolean {
  if (node.isDirectory) {
    throw Error("Directories cannot be images.");
  }

  return IMG_EXTENSIONS.has(node.ext.toLowerCase());
}
