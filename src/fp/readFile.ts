import fs from "fs";

import FsNode from "../types/FsNode";

export async function readFile(node: FsNode): Promise<string> {
  if (node.isDirectory) {
    throw Error("cannot readFile if node.isDirectory === true");
  }

  try {
    const buffer = await fs.promises.readFile(node.abspath);

    return buffer.toString();
  } catch (error) {
    return error.toString();
  }
}
