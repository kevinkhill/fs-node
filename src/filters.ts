import { filter, propEq } from "lodash/fp";

import { FsNode } from "./FsNode";

/**
 * Filters
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const onlyExt = (extension: string) => {
  return filter(propEq("ext", extension));
};

export const onlyFiles = filter((node: FsNode) => node.isFile);

export const onlyDirs = filter((node: FsNode) => node.isDirectory);
