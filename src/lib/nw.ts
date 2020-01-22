import fs from "fs";
import path from "path";
import readdirp from "readdirp";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NwRequire = (id: string) => any;

export interface FsVaultCore {
  fs: typeof fs;
  path: typeof path;
  readdirp: typeof readdirp;
}

export const isNw = (window: Window): boolean => "nw" in window;

export function nwRequire(window: Window): NwRequire {
  return window?.nw?.require;
}
