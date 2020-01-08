import path from "path";
import map from "lodash/fp/map";

import { ProgramVault } from "../src";

let vault: ProgramVault;

beforeEach(() => {
  vault = new ProgramVault({
    root: path.join(__dirname, "vault")
  });
});

test("Count the files & folders in /sys_1", async (done) => {
  vault.cd("sys_1");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();
  const fileNames = map("name", dirs);

  expect(dirs).toHaveLength(2);
  expect(fileNames).toContain("part_A");
  expect(fileNames).toContain("part_B");

  expect(files).toHaveLength(0);

  done();
});

test("Count the files & folders in /job_9/part_E", async (done) => {
  vault.cd("job_9/part_E");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();

  expect(dirs).toHaveLength(0);
  expect(files).toHaveLength(6);

  done();
});
