import { filter, reject } from "lodash/fp";

import { FsNode } from "../types";

export const onlyFiles = filter((node: FsNode) => node.isFile);
export const onlyDirs = filter((node: FsNode) => node.isDirectory);

export const noFiles = reject((node: FsNode) => node.isFile);
export const noDirs = reject((node: FsNode) => node.isDirectory);
export const noDotfiles = reject((node: FsNode) =>
  node.name.startsWith(".")
);

export function isSetupNode(node: FsNode): boolean {
  return node.name === "SETUP_INFO";
}

export function fwdSlash(path: string): string {
  console.log(path);

  return path.replace(/\\/g, "/");
}

export function getExt(filename: string): string | undefined {
  const parts = filename.split(".");

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
}
