import { any, filter, includes, map, reject } from "lodash/fp";

import { FsVault } from "..";
import { ls } from "../fp";
import { FsNode } from "../types";

export function getExt(filename: string): string | undefined {
  const parts = filename.split(".");

  if (parts.length > 1) {
    return parts[parts.length - 1];
  }
}

export const onlyFiles = filter((node: FsNode) => node.isFile);
export const onlyDirs = filter((node: FsNode) => node.isDirectory);

export const noFiles = reject((node: FsNode) => node.isFile);
export const noDirs = reject((node: FsNode) => node.isDirectory);
export const noDotfiles = reject((node: FsNode) =>
  node.name.startsWith(".")
);

export const blacklistExt = (extensions: string[]) => (
  node: FsNode
): boolean => includes(node.ext, extensions);

export function isSetupNode(node: FsNode): boolean {
  return node.name === "SETUP_INFO";
}

export const hasSetupNode = any(isSetupNode);

export async function getSetupInfo(node: FsNode): Promise<FsNode[]> {
  if (node.isDirectory) {
    const hasSetupInfo = any(
      isSetupNode,
      await this.getDirs(node.abspath)
    );

    if (hasSetupInfo) {
      return this.getContents("SETUP_INFO");
    }

    return [];
  }
}

// export async function getParent(
//   node: FsNode
// ): Promise<FsNode | undefined> {
//   return find(
//     (node: FsNode) => node.name === currentDir,
//     await this.getDirs("..")
//   );
// }
