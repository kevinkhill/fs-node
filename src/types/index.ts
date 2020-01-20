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
  name: string;
  ext?: string;
  dir: string;
  abspath: string;
  relpath: string;
  isFile: boolean;
  isImage: boolean;
  isDirectory: boolean;
}
