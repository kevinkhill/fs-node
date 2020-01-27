import { any } from "lodash/fp";
import type { FsNode } from "../src/FsNode";

export const anyFileNamed = (name: string, files: FsNode[]) => {
  return any(["name", name], files);
}
