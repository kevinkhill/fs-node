import _ from "lodash/fp";

import { FsNode, Maybe } from "../types";

export const onlyFiles = _.filter((node: FsNode) => node.isFile);
export const onlyDirs = _.filter((node: FsNode) => node.isDirectory);

export const noFiles = _.reject((node: FsNode) => node.isFile);
export const noDirs = _.reject((node: FsNode) => node.isDirectory);
export const noDotfiles = _.reject((node: FsNode) =>
  node.name.startsWith(".")
);

export function fwdSlash(path: string): string {
  console.log(path);

  return path.replace(/\\/g, "/");
}

export function getExt(filename: string): Maybe<string> {
  const parts = filename.split(".");

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
}
