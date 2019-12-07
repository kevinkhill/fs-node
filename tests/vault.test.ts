import path from "path";

import NcVault from "../src";

const vault = new NcVault({
  root: path.join(__dirname, "vault")
});

test('Scan vault.root and check file count', async (done) => {
  const index = await vault.getIndex();

  expect(index.length).toBe(15);

  done();
});

test("Count the number of folders in vault.cwd", async (done) => {
  const contents = await vault.getDirs();

  expect(contents.length).toBe(2);

  done();
});

test("Count the number of folders in vault/category_1", async (done) => {
  const contents = await vault.cd("category_1").getDirs();

  expect(contents.length).toBe(1);

  done();
});

test("Count the number of folders in vault/category_2", async (done) => {
  const contents = await vault.cd("category_2").getDirs();

  expect(contents.length).toBe(2);

  done();
});
