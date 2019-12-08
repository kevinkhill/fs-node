import path from "path";

import NcVault from "../src";

let vault: NcVault;

beforeEach(() => {
  vault = new NcVault({
    root: path.join(__dirname, "vault")
  });
});

test('Test `onlyExt` option for vault.getFiles()', async (done) => {
  vault.cd("sys_1/part_B");

  const ncFiles = await vault.getFiles({
    onlyExt: "nc"
  });

  expect(ncFiles.length).toBe(3);

  const mcamFiles = await vault.getFiles({
    onlyExt: "mcam"
  });

  expect(mcamFiles.length).toBe(1);

  const modelFiles = await vault.getFiles({
    onlyExt: "sldprt"
  });

  expect(modelFiles.length).toBe(1);

  done();
});
