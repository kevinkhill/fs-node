import { map } from "lodash/fp";

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

  const nodes = await Promise.all(
    map(
      (abspath: string) => createFsNode($this, abspath),
      await $this.readdir($this.cwd)
    )
  );

  return nodes;
}
