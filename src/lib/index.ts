import { filter, includes, propEq, reject } from "lodash/fp";

import { FsNode } from "../types";

export function getExt(filename: string): string | undefined {
  const parts = filename.split(".");

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const ext = (extension: string) =>
  filter(propEq("ext", extension));

export const onlyFiles = filter((node: FsNode) => node.isFile);
export const onlyDirs = filter((node: FsNode) => node.isDirectory);

export const noFiles = reject((node: FsNode) => node.isFile);
export const noDirs = reject((node: FsNode) => node.isDirectory);
export const noDotfiles = reject((node: FsNode) =>
  node.name.startsWith(".")
);

export const blacklistExt = (extensions: string[]) => (
  node: FsNode
): boolean => includes(node.ext, extensions);
