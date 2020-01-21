import { any } from "lodash/fp";

import { FsVault } from "../FsVault";

export { createFsNode } from "./createFsNode";
export { getFiles } from "./getFiles";
export { getDirs } from "./getDirs";
export { ls } from "./ls";
export { hasSetupInfo, getSetupInfo } from "./setupInfo";

export function vault(root: string): FsVault {
  return FsVault.create(root);
}
