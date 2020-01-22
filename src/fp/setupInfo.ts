import { any, find, propEq } from "lodash/fp";

import { FsNode, FsVault } from "../index";
import { getDirs, ls } from "./index";

export const isSetupNode = propEq("name", "SETUP_INFO");

export const hasSetupNode = any(isSetupNode);

export async function hasSetupInfo(vault: FsVault): Promise<boolean> {
  return any(isSetupNode, await getDirs(vault));
}

export async function getSetupInfo(
  vault: FsVault,
  relpath?: string
): Promise<FsNode | undefined> {
  const $this = relpath ? vault.clone(relpath) : vault;

  if ((await hasSetupInfo($this)) === false) {
    return undefined;
  }

  return find(isSetupNode, await ls($this));
}
