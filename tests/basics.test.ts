import path from "path";
import { get, map } from "lodash/fp";

import { getFiles, getDirs, FsNode, node } from "../src";

let root: FsNode;

beforeEach(() => {
  root = node(path.join(__dirname, "vault"));
});

test("Count the files in /misc", async (done) => {
  const files = await getFiles(root, "misc");

  expect(files).toHaveLength(1);

  const fileNames = map(get("name"), files);

  expect(fileNames).toContain("test_1.nc");

  done();
});

test("Count the folders in /sys_1", async (done) => {
  const dirs = await getDirs(root, "sys_1");

  expect(dirs).toHaveLength(2);

  done();
});

test("Count the files /job_9/part_E", async (done) => {
  const files = await getFiles(root, "job_9/part_E");

  expect(files).toHaveLength(6);

  done();
});

test("Count the folders in /job_9/part_E", async (done) => {
  const dirs = await getDirs(root, "job_9/part_E");

  expect(dirs).toHaveLength(0);

  done();
});
