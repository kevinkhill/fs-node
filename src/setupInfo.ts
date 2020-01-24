import { any, find } from "lodash/fp";

import { cd } from "./cd";
import { FsNode } from "./FsNode";
import { ls } from "./ls";

export const isSetupNode = (node: FsNode): boolean =>
  node.name === "SETUP_INFO";

export const hasSetupNode = any(isSetupNode);

export const hasSetupInfo = any(hasSetupNode);

export async function getSetupInfo(
  node: FsNode,
  relpath?: string
): Promise<FsNode | undefined> {
  const dest = relpath ? await cd(node, relpath) : node;

  if ((await hasSetupInfo(dest)) === false) {
    return undefined;
  }

  return find(isSetupNode, await ls(dest));
}
