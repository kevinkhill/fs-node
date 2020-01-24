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
