import path from "path";

import { FsVault } from "../src";
import { getFiles } from "../src/fp";
import { ext } from "../src/lib";

let vault: FsVault;

beforeEach(() => {
  vault = FsVault.create(path.join(__dirname, "vault"));
});

test('Test extension filter creation function on getFiles', async (done) => {
  vault.cd("sys_1/part_B");

  const onlyNc = ext("nc");

  const ncFiles = onlyNc(await getFiles(vault));

  expect(ncFiles).toHaveLength(3);

  const onlyMcam = ext("mcam");

  const mcamFiles = onlyMcam(await getFiles(vault));

  expect(mcamFiles).toHaveLength(1);


  const onlySld = ext("sldprt");

  const sldFiles = onlySld(await getFiles(vault));

  expect(sldFiles).toHaveLength(1);

  done();
});
