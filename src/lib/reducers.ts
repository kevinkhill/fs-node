import { filter, propEq, reject } from "lodash/fp";

import FsNode from "../types/FsNode";

/**
 * Filters
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const onlyExt = (extension: string) => {
  return filter(propEq("ext", extension));
};

export const onlyFiles = filter((node: FsNode) => node.isFile);

export const onlyDirs = filter((node: FsNode) => node.isDirectory);

/**
 * Rejectors
 */
export const noFiles = reject((node: FsNode) => node.isFile);

export const noDirs = reject((node: FsNode) => node.isDirectory);

export const noDotfiles = reject((node: FsNode) =>
  node.name.startsWith(".")
);
