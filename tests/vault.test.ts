import path from "path";

import NcVault from "../src";

let vault: NcVault;

beforeEach(() => {
  vault = new NcVault({
    root: path.join(__dirname, "vault")
  });
});

test('Scan vault.root and check file count', async (done) => {
  const index = await vault.getIndex();

  expect(index.length).toBe(15);

  done();
});
