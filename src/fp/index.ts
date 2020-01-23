import { FsVault } from "../FsVault";
import { createVault } from "./vault";

export { createFsNode } from "./createFsNode";
export { onlyDirs, onlyExt, onlyFiles } from "./filters";
export { getFiles } from "./getFiles";
export { getDirs } from "./getDirs";
export { ls } from "./ls";
export { cd } from "./cd";
export { readFile } from "./readFile";
export { noDirs, noDotfiles, noFiles } from "./rejects";
export { createVault, fromNode } from "./vault";
export { getContents } from "./getContents";
export { node } from "./node";
export {
  hasSetupNode,
  isSetupNode,
  hasSetupInfo,
  getSetupInfo
} from "./setupInfo";

export function clone(vault: FsVault, relpath?: string): FsVault {
  const newVault = createVault(vault.cwd);

  newVault.cd(relpath);

  return newVault;
}
