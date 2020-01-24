import path from "path";
import map from "lodash/fp/map";

import { hasSetupInfo, getSetupInfo, FsNode, createNode, cd } from "../src";

let root: FsNode;

beforeEach(async () => {
  root = await createNode(path.join(__dirname, "vault"));
});

test.skip("Check if this.cwd contains a 'SETUP_INFO' dir", async (done) => {
  const partD = await cd(root, "job_9/part_D");

  expect(await hasSetupInfo(partD)).toBeTruthy();

  done();
});

// test.skip("Check if a given relative path contains a 'SETUP_INFO' dir", async (done) => {
//   expect(await hasSetupInfo(vault, "job_9/part_D")).toBeTruthy();

//   done();
// });

test.skip("Get a 'SETUP_INFO' dir", async (done) => {
  const misc = await cd(root, "misc");

  expect(await hasSetupInfo(misc)).toBeTruthy();

  const setupInfo = await getSetupInfo(misc);

  expect(setupInfo).toHaveLength(3);

  done();
});
