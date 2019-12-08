import path from "path";
import map from "lodash/fp/map";

import ProgramVault from "../src";

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

  expect(dirs.length).toBe(2);
  expect(map("name", dirs)).toContain("part_A");
  expect(map("name", dirs)).toContain("part_B");

  expect(files.length).toBe(0);

  done();
});

// test("Traverse back to parent from /job_9/part_E", async (done) => {
//   // vault.cd();

//   const dirs = await vault.getDirs("job_9/part_E");
//   const parent = await dirs[0].getParent();

//   expect(parent.name).toBe("job_9");

//   done();
// });

test("Count the files & folders in /job_9/part_E", async (done) => {
  vault.cd("job_9/part_E");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();

  expect(dirs.length).toBe(2);
  expect(files.length).toBe(6);

  done();
});
