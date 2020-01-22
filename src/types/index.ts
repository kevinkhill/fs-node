import { getDirs, getFiles } from "../fp";
import FsNode from "./FsNode";

export { FsNode };

export type FilterList = Partial<Record<string, string[]>>;

export interface FsActions {
  getDirs: typeof getDirs;
  getFiles: typeof getFiles;
}

export interface VaultOptions {
  root: string;
  blacklist?: {
    ext?: string[];
    filename?: string[];
  };
  whitelist?: {
    ext?: string[];
    filename?: string[];
  };
}
