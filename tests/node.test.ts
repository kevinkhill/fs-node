import path from "path";

import { FsNode } from "../src";
import { onlyExt, getFiles, node, cd } from "../src/fp";

let root: FsNode;

beforeEach(() => {
  root = node(path.join(__dirname, "vault"));
});

test('Test extension filter creation function on getFiles', async (done) => {
  const onlyNc = onlyExt("nc");
  const onlyMcam = onlyExt("mcam");
  const onlySld = onlyExt("sldprt");

  const partBDir = await cd(root, "sys_1/part_B");

  const ncFiles = onlyNc(await getFiles(partBDir));
  expect(ncFiles).toHaveLength(3);

  const mcamFiles = onlyMcam(await getFiles(partBDir));
  expect(mcamFiles).toHaveLength(1);

  const sldFiles = onlySld(await getFiles(partBDir));
  expect(sldFiles).toHaveLength(1);

  done();
});
