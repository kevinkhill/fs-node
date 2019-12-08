export type Maybe<T> = T | undefined;

export type FilterList = Partial<Record<string, string[]>>;

export interface GetFilesOptions {
  dotfiles?: boolean;
  onlyExt?: string;
  extWhitelist?: string[];
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

export interface FsNode {
  abspath: string;
  dir: string;
  ext: Maybe<string>;
  isDirectory: boolean;
  isFile: boolean;
  isImage: boolean;
  name: string;
  relpath: string;
  getParent: Function;
  getContents: Function;
  getSetupInfo: Function;
}
