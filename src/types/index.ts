export type FilterList = Partial<Record<string, string[]>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NwRequire = (id: string) => any;

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
  ext?: string;
  isDirectory: boolean;
  isFile: boolean;
  isImage: boolean;
  name: string;
  relpath: string;
  getParent: Function;
  getContents: Function;
  getSetupInfo: Function;
}
