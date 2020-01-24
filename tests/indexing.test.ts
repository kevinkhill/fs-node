import path from "path";

import { FsNode, crawl, createNode } from "../src";

let root: FsNode;

beforeEach(async () => {
  root = await createNode(path.join(__dirname, "vault"));
});

test('Scan vault.root and check file count', async (done) => {
  const index = await crawl(root);

  expect(index).toHaveLength(27);

  done();
});
