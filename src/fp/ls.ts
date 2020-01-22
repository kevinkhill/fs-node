import { map, partial } from "lodash/fp";

import { createFsNode } from "../fp";
import { FsNode, FsVault } from "../index";

/**
 * Retrive a listing of all `FsNode` in `this.cwd`
 *
 * If `path` is given, then it will be used instead of `this.cwd`
 */
export async function ls(
  vault: FsVault,
  relpath?: string
): Promise<FsNode[]> {
  const $this = relpath ? vault.clone(relpath) : vault;

  const nodeFactory = partial(createFsNode, [$this]);

  const nodes = await Promise.all(
    map(nodeFactory, await $this.readdir($this.cwd))
  );

  return nodes;
}
