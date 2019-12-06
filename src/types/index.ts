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
  ext: Maybe<string>;
  name: string;
  isDirectory: boolean;
  isFile: boolean;
  mime: Maybe<string>;
  path: string;
  relpath: string;
}
