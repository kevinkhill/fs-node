import path from "path";

import { onlyExt, getFiles, FsNode, node, cd } from "../src";

let root: FsNode;

beforeEach(() => {
  root = node(path.join(__dirname, "vault"));
});

test('Test extension filter creation function on getFiles', async (done) => {
  const partB = await cd(root, "sys_1/part_B");

  const ncFiles = onlyExt("nc")(await getFiles(partB));
  expect(ncFiles).toHaveLength(3);

  const mcamFiles = onlyExt("mcam")(await getFiles(partB));
  expect(mcamFiles).toHaveLength(1);

  const sldFiles = onlyExt("sldprt")(await getFiles(partB));
  expect(sldFiles).toHaveLength(1);

  done();
});
