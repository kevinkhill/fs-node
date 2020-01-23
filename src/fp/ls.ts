import fs from "fs";
import { map, partial } from "lodash/fp";
import path from "path";

import { FsNode } from "..";
import { createFsNode } from "../fp";

/**
 * Retrive a listing of all `FsNode` in `this.cwd`
 *
 * If `path` is given, then it will be used instead of `this.cwd`
 */
// export async function ls(
//   vault: FsVault,
//   relpath?: string
// ): Promise<FsNode[]> {
//   const $this = relpath ? clone(vault, relpath) : vault;

//   const nodeFactory = partial(createFsNode, [$this]);

//   const nodes = await Promise.all(
//     map(nodeFactory, await $this.readdir($this.cwd))
//   );

//   return nodes;
// }

export async function ls(node: FsNode): Promise<FsNode[]> {
  const nodes = await Promise.all(
    map((entry: string) => {
      return createFsNode(node, path.join(node.abspath, entry));
    }, await fs.promises.readdir(node.abspath))
  );

  return nodes;
}
