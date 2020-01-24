import path from "path";

import { FsNode } from "./FsNode";

export function node(root: string): FsNode {
  if (!path.isAbsolute(root)) {
    throw Error("root must be an absolute path");
  }

  const name = root.split(path.sep).pop();

  return Object.freeze({
    name,
    root,
    dir: "",
    relpath: "/",
    abspath: root,
    isRoot: true,
    isFile: false,
    isImage: false,
    isDirectory: true
  });
}
