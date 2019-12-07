import path from "path";

import NcVault from "../src";

let vault: NcVault;

beforeEach(() => {
  vault = new NcVault({
    root: path.join(__dirname, "vault")
  });
});

test("Check if this.cwd contains a 'SETUP_INFO' dir", async (done) => {
  vault.cd("category_2/part_D")

  expect(await vault.hasSetupInfo()).toBeTruthy();

  done();
});

test("Check if a given relative path contains a 'SETUP_INFO' dir", async (done) => {
  expect(await vault.hasSetupInfo("category_2/part_D")).toBeTruthy();

  done();
});
