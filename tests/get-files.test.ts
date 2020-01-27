import path from "path";

import { onlyExt, getFiles, FsNode, createNode, cd } from "../src";

let root: FsNode;

beforeEach(async () => {
  root = await createNode(path.join(__dirname, "vault"));
});

test.skip('Test extension filter creation function on getFiles', async (done) => {
  const partB = await cd(root, "sys_1/part_B");
  const files = await getFiles(partB);

  const ncFiles = onlyExt(files, "nc");
  expect(ncFiles).toHaveLength(3);

  const mcamFiles = onlyExt(files, "mcam");
  expect(mcamFiles).toHaveLength(1);

  const sldFiles = onlyExt(files, "sldprt");
  expect(sldFiles).toHaveLength(1);

  done();
});
