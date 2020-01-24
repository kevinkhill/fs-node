import fs from "fs";
import map from "lodash/fp/map";
import path from "path";

import { FsNode } from "./FsNode";
import { cd } from "./cd";
import { createNode } from "./createNode";

/**
 * Retrive all {@link FsNode} from the given node
 */
export async function ls(
  node: FsNode,
  relpath?: string
): Promise<FsNode[]> {
  const dest = relpath ? await cd(node, relpath) : node;

  const pathEntries = await fs.promises.readdir(dest.abspath);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const nodeCreator = (entry: string): Promise<FsNode> => {
    return createNode(path.join(dest.abspath, entry), dest);
  };

  return Promise.all(map(nodeCreator, pathEntries));
}
