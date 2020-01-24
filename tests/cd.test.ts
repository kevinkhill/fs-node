import path from "path";
import map from "lodash/fp/map";

import { getFiles, getDirs, cd, node, FsNode } from "../src";

let root: FsNode;

beforeEach(() => {
  root = node(path.join(__dirname, "vault"));
});

test("cd('/sys_1/part_A')", async (done) => {
 const partA = await cd(root, "/sys_1/part_A");

  const dirs = await getDirs(partA);
  expect(dirs).toHaveLength(0);

  const files = await getFiles(partA);
  const fileNames = map("name", files);

  expect(files).toHaveLength(3);
  expect(fileNames).toContain("file_op1.nc");
  expect(fileNames).toContain("file_op2.nc");
  expect(fileNames).toContain("file.mcam");

  done();
});

test("cd('/job_9/part_E') from sub-folder", async (done) => {
  const partE = await cd(root, "/job_9/part_E");

  const dirs = await getDirs(partE);
  expect(dirs).toHaveLength(0);

  const files = await getFiles(partE);
  const fileNames = map("name", files);

  expect(files).toHaveLength(6);
  expect(fileNames).toContain("file_op1.mcam");
  expect(fileNames).toContain("file_op1.nc");
  expect(fileNames).toContain("file_op2.mcam");
  expect(fileNames).toContain("file_op2.nc");
  expect(fileNames).toContain("file_op3.mcam");
  expect(fileNames).toContain("file_op3.nc");

  done();
});
