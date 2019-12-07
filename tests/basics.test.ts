import path from "path";

import NcVault from "../src";

let vault: NcVault;

beforeEach(() => {
  vault = new NcVault({
    root: path.join(__dirname, "vault")
  });
});

test("Count the files & folders in /category_1", async (done) => {
  vault.cd("category_1");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();

  expect(dirs.length).toBe(1);
  expect(dirs[0].name).toBe("part_A");

  expect(files.length).toBe(0);

  done();
});

// test("Traverse back to parent from /category_2/part_E", async (done) => {
//   // vault.cd();

//   const dirs = await vault.getDirs("category_2/part_E");
//   const parent = await dirs[0].getParent();

//   expect(parent.name).toBe("category_2");

//   done();
// });

test("Count the files & folders in /category_2/part_E", async (done) => {
  vault.cd("category_2/part_E");

  const dirs = await vault.getDirs();
  const files = await vault.getFiles();

  expect(dirs.length).toBe(2);
  expect(files.length).toBe(6);

  done();
});
