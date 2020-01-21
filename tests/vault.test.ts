import path from "path";

import { FsVault } from "../src";

let vault: FsVault;

beforeEach(() => {
  vault = new FsVault({
    root: path.join(__dirname, "vault")
  });
});

test('Scan vault.root and check file count', async (done) => {
  const index = await vault.getIndex();

  expect(index.length).toBe(27);

  done();
});
