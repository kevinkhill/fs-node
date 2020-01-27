export { cd } from "./cd";
export { createNode } from "./createNode";
export { onlyDirs, onlyExt, onlyFiles } from "./filters";
export { getContents } from "./getContents";
export { getDirs } from "./getDirs";
export { getFiles } from "./getFiles";
export { scan, crawl } from "./indexer";
export { ls } from "./ls";
export { readFile } from "./readFile";
export { noDirs, noDotfiles, noFiles } from "./rejects";
export {
  hasSetupNode,
  isSetupNode,
  hasSetupInfo,
  getSetupInfo
} from "./setupInfo";

export interface FsNode {
  name: string;
  ext?: string;
  root: string;
  abspath: string;
  relpath: string;
  isRoot: boolean;
  isFile: boolean;
  isDirectory: boolean;
}
