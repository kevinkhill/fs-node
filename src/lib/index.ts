import { Maybe } from "src/types";

import { mime } from "./mime";

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
