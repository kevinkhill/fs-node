import path from "path";

import { FsVault } from "../src";
import { onlyExt, getFiles, createVault } from "../src/fp";

let vault: FsVault;

beforeEach(() => {
  vault = createVault(path.join(__dirname, "vault"));
});

test('Test extension filter creation function on getFiles', async (done) => {
  vault.cd("sys_1/part_B");

  const onlyNc = onlyExt("nc");

  const ncFiles = onlyNc(await getFiles(vault));

  expect(ncFiles).toHaveLength(3);

  const onlyMcam = onlyExt("mcam");

  const mcamFiles = onlyMcam(await getFiles(vault));

  expect(mcamFiles).toHaveLength(1);


  const onlySld = onlyExt("sldprt");

  const sldFiles = onlySld(await getFiles(vault));

  expect(sldFiles).toHaveLength(1);

  done();
});
