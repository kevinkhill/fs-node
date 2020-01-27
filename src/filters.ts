import { filter } from "lodash/fp";

import { FsNode } from ".";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const onlyExt = (nodes: FsNode[], extension: string) => {
  return filter(node => node.ext === extension, nodes);
};

export const onlyFiles = filter((node: FsNode) => node.isFile);

export const onlyDirs = filter((node: FsNode) => node.isDirectory);
