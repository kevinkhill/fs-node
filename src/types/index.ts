export interface FsNode {
  name: string;
  ext?: string;
  dir: string;
  root: string;
  abspath: string;
  relpath: string;
  isFile: boolean;
  isImage: boolean;
  isDirectory: boolean;
}

export interface VaultOptions {
  root: string;
}
