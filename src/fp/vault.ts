import { FsVault } from "../FsVault";
import { FsNode } from "../types";

export function createVault(root: string): FsVault {
  return new FsVault({ root });
}

export function fromNode(node: FsNode): FsVault {
  const vault = createVault(node.root);

  vault.cd(node.relpath);

  return vault;
}
