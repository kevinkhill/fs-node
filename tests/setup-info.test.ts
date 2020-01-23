import path from "path";
import map from "lodash/fp/map";

import { FsVault } from "../src";
import { hasSetupInfo, getSetupInfo, createVault } from "../src/fp";

let vault: FsVault;

beforeEach(() => {
  vault = createVault(path.join(__dirname, "vault"));
});

test.skip("Check if this.cwd contains a 'SETUP_INFO' dir", async (done) => {
  vault.cd("job_9/part_D");

  expect(await hasSetupInfo(vault)).toBeTruthy();

  done();
});

// test.skip("Check if a given relative path contains a 'SETUP_INFO' dir", async (done) => {
//   expect(await hasSetupInfo(vault, "job_9/part_D")).toBeTruthy();

//   done();
// });

test.skip("Get a 'SETUP_INFO' dir", async (done) => {
  vault.cd("misc");

  expect(await hasSetupInfo(vault)).toBeTruthy();

  const setupInfo = await getSetupInfo(vault);

  expect(setupInfo).toHaveLength(3);

  done();
});
