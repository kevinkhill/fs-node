import { reject } from "lodash/fp";

import { FsNode } from "../types";

export const noFiles = reject((node: FsNode) => node.isFile);

export const noDirs = reject((node: FsNode) => node.isDirectory);

export const noDotfiles = reject((node: FsNode) =>
  node.name.startsWith(".")
);
