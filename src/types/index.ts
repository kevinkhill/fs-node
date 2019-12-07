export type Maybe<T> = T | undefined;

export type FilterList = Partial<Record<string, string[]>>;

export interface NcVaultOptions {
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

export interface FsNode {
  abspath: string;
  dir: string;
  ext: Maybe<string>;
  isDirectory: boolean;
  isFile: boolean;
  isImage: boolean;
  name: string;
  relpath: string;
  getContents: Function;
  getParent: Function;
}
