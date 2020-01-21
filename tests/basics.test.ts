import path from "path";
import map from "lodash/fp/map";

import { FsVault } from "../src";
import { vault, getFiles, getDirs } from "../src/fp";
import { mapName } from "../src/lib";

let testVault: FsVault;

beforeEach(() => {
  testVault = vault(path.join(__dirname, "vault"));
});

test("Count the files in /sys_1", async (done) => {
  const files = await getFiles(testVault, "sys_1");

  console.log(files);
  const fileNames = mapName(files);

  expect(fileNames).toContain("part_A");
  expect(fileNames).toContain("part_B");

  expect(files).toHaveLength(0);

  done();
});

test("Count the folders in /sys_1", async (done) => {
  const dirs = await getDirs(testVault, "sys_1");

  expect(dirs).toHaveLength(2);

  done();
});

test("Count the files /job_9/part_E", async (done) => {
  const files = await getFiles(testVault, "job_9/part_E");

  expect(files).toHaveLength(6);

  done();
});

test("Count the folders in /job_9/part_E", async (done) => {
  const dirs = await getDirs(testVault, "job_9/part_E");

  expect(dirs).toHaveLength(0);

  done();
});
