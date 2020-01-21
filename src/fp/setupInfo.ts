import { any, find } from "lodash/fp";

import { FsNode, FsVault } from "../index";
import { isSetupNode } from "../lib";
import { getDirs, ls } from "./index";

export async function hasSetupInfo(vault: FsVault): Promise<boolean> {
  return any(isSetupNode, await getDirs(vault));
}

export async function getSetupInfo(
  vault: FsVault,
  relpath?: string
): Promise<FsNode | undefined> {
  const $this = relpath ? vault.chroot(relpath) : vault;

  if ((await hasSetupInfo($this)) === false) {
    return undefined;
  }

  return find(
    (node: FsNode) => node.name === "SETUP_INFO",
    await ls($this)
  );
}
