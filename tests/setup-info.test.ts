import path from "path";

import NcVault from "../src";

let vault: NcVault;

beforeEach(() => {
  vault = new NcVault({
    root: path.join(__dirname, "vault")
  });
});

test("Check if this.cwd contains a 'SETUP_INFO' dir", async (done) => {
  vault.cd("job_9/part_D")

  expect(await vault.hasSetupInfo()).toBeTruthy();

  done();
});

test("Check if a given relative path contains a 'SETUP_INFO' dir", async (done) => {
  expect(await vault.hasSetupInfo("job_9/part_D")).toBeTruthy();

  done();
});

test("Get a 'SETUP_INFO' dir", async (done) => {
  vault.cd("misc")

  expect(await vault.hasSetupInfo()).toBeTruthy();

  const setupInfo = await vault.getSetupInfo();

  expect(setupInfo.length).toBe(3);

  done();
});
