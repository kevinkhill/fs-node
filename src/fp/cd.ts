import path from "path";

import { FsNode } from "..";
import { clone, createFsNode } from "../fp";

/**
 * Behaves the same way `cd` does, with `/` acting as `this.dest`
 */
// export function cd(vault: FsVault, dest = "/"): FsVault {
//   const $this = dest ? clone(vault, dest) : vault;

//   if (dest.startsWith("/")) {
//     this.currentDir = dest;
//   } else {
//     this.currentDir = this._path.join(this.currentDir, dest);
//   }

//   return $this;
// }

export function cd(node: FsNode, dest = "/"): Promise<FsNode> {
  let newDest;

  if (dest.startsWith("/")) {
    newDest = node.root;
  } else {
    newDest = path.join(node.abspath, dest);
  }

  return createFsNode(node, newDest);
}
