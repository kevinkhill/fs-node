import path from "path";

import { FsVault } from "../src";

let vault: FsVault;

beforeEach(() => {
  vault = FsVault.create(path.join(__dirname, "vault"));
});


test('Scan vault.root and check file count', async (done) => {
  const index = await vault.getIndex();

  expect(index).toHaveLength(27);

  done();
});
