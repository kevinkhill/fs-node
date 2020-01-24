import { isImage as npmIsImage } from "is-image";

import { FsNode } from "./FsNode";

export function isImage(node: FsNode): boolean {
  return npmIsImage(node.abspath);
}
