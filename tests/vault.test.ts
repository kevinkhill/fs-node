import path from "path";

import NcVault from "../src";

test('Scan the vault and check the index', async (done) => {
  const vault = new NcVault({
    root: path.resolve("C:/H+405 PROGRAM VAULT")
  });

  expect((await vault.getIndex()).length).toBe(1919);
  done();
});
