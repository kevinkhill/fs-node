import path from "path";

import { FsVault } from "../src";
import { createVault } from "../src/fp";

let vault: FsVault;

beforeEach(() => {
  vault = createVault(path.join(__dirname, "vault"));
});


test('Scan vault.root and check file count', async (done) => {
  const index = await vault.getIndex();

  expect(index).toHaveLength(27);

  done();
});
