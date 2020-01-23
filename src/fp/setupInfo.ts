import { any, find } from "lodash/fp";

import { FsNode, FsVault } from "..";
import { clone, getDirs, ls } from ".";

export const isSetupNode = (node: FsNode): boolean =>
  node.name === "SETUP_INFO";

export const hasSetupNode = any(isSetupNode);

export async function hasSetupInfo(
  node: FsVault | FsNode[]
): Promise<boolean> {
  const nodes = node instanceof FsVault ? await getDirs(node) : node;

  return hasSetupNode(nodes);
}

export async function getSetupInfo(
  vault: FsVault,
  relpath?: string
): Promise<FsNode | undefined> {
  const $this = relpath ? clone(vault, relpath) : vault;

  if ((await hasSetupInfo($this)) === false) {
    return undefined;
  }

  return find(isSetupNode, await ls($this));
}
