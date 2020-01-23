import fs from "fs";
import path from "path";

import { FsNode } from "../types";

export function node(root: string): FsNode {
  if (!path.isAbsolute(root)) throw Error("root must be absolute");

  // const name = root.split(path.sep).pop();

  return Object.freeze({
    name: "[ROOT]",
    root,
    dir: "",
    relpath: "/",
    abspath: root,
    isFile: false,
    isImage: false,
    isDirectory: true
  });
}
