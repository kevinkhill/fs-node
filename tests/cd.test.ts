import path from "path";
import map from "lodash/fp/map";

import { ProgramVault } from "../src";

let vault: ProgramVault;

beforeEach(() => {
  vault = new ProgramVault({
    root: path.join(__dirname, "vault")
  });
});

test("cd('/sys_1/part_A')", async (done) => {
  vault.cd("/sys_1/part_A");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();
  const fileNames = map("name", files);

  expect(dirs).toHaveLength(0);
  expect(files).toHaveLength(3);

  expect(fileNames).toContain("file_op1.nc");
  expect(fileNames).toContain("file_op2.nc");
  expect(fileNames).toContain("file.mcam");

  done();
});

test("cd('/job_9/part_E') from sub-folder", async (done) => {
  vault.cd("sys_1");
  vault.cd("/job_9/part_E");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();
  const fileNames = map("name", files);

  expect(dirs).toHaveLength(0);
  expect(files).toHaveLength(6);

  expect(fileNames).toContain("file_op1.mcam");
  expect(fileNames).toContain("file_op1.nc");
  expect(fileNames).toContain("file_op2.mcam");
  expect(fileNames).toContain("file_op2.nc");
  expect(fileNames).toContain("file_op3.mcam");
  expect(fileNames).toContain("file_op3.nc");

  done();
});
