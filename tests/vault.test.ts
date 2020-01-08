import path from "path";

import { ProgramVault } from "../src";

let vault: ProgramVault;

beforeEach(() => {
  vault = new ProgramVault({
    root: path.join(__dirname, "vault")
  });
});

test('Scan vault.root and check file count', async (done) => {
  const index = await vault.getIndex();

  expect(index.length).toBe(27);

  done();
});
