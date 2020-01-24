export interface FsNode {
  name: string;
  ext?: string;
  dir?: string;
  root: string;
  abspath: string;
  relpath: string;
  isRoot: boolean;
  isFile: boolean;
  isImage: boolean;
  isDirectory: boolean;
}
