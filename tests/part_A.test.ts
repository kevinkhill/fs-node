import path from "path";
import { get, map } from "lodash/fp";

import { getFiles, getDirs, FsNode, createNode, cd } from "../src";

let root: FsNode;

beforeEach(async () => {
  root = await createNode(path.join(__dirname, "vault"));
});

test("cd to 'sys_1/part_A'", async (done) => {
  const part_A = await cd(root, "sys_1/part_A");

  expect(part_A.isDirectory).toBeTruthy();
  expect(part_A.name).toBe("part_A");

  done();
});
