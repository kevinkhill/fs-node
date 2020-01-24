import path from "path";

import { createFsNode, FsNode } from ".";

/**
 * Behaves the same way `cd` does, with `/` acting as `this.dest`
 */
export function cd(node: FsNode, dest = "/"): Promise<FsNode> {
  let newDest;

  if (dest.startsWith("/")) {
    newDest = node.root;
  } else {
    newDest = path.join(node.abspath, dest);
  }

  return createFsNode(node, newDest);
}
