import path from "path";
import { get, map } from "lodash/fp";

import { getFiles, getDirs, FsNode, createNode, cd } from "../src";

let root: FsNode;

beforeEach(async () => {
  root = await createNode(path.join(__dirname, "vault"));
});

test("await cd(root, 'sys_1')", async (done) => {
  const sys1Dir = await cd(root, "sys_1");

  expect(sys1Dir.isDirectory).toBeTruthy();
  expect(sys1Dir.name).toBe("sys_1");

  done();
});

test("await getDirs(root, 'sys_1')", async (done) => {
  const dirs = await getDirs(root, "sys_1");

  expect(dirs).toHaveLength(2);

  done();
});

test("await getFiles(root, 'sys_1')", async (done) => {
  const files = await getFiles(root, "sys_1");

  expect(files).toHaveLength(1);
  expect(files[0].name).toBe("sys_1.txt");

  done();
});

test("await getDirs(FsNode)", async (done) => {
  const sys1Dir = await cd(root, "sys_1");
  const dirs = await getDirs(sys1Dir);

  expect(dirs).toHaveLength(2);

  done();
});
