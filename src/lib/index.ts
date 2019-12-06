import _ from "lodash/fp";
import mime from "mime";

import { FsNode, Maybe } from "../types";

mime.define({ "text/gcode": ["nc"] }, true);
mime.define({
  "application/mastercam": ["mcam", "mcx-9", "mcx-8", "mc9"]
});

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

export function getMime(filename: string): Maybe<string> {
  return mime.getType(filename) || undefined;
}
