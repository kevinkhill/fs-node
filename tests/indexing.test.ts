import path from "path";

import { FsNode, node, crawl } from "../src";

let root: FsNode;

beforeEach(() => {
  root = node(path.join(__dirname, "vault"));
});

test('Scan vault.root and check file count', async (done) => {
  const index = await crawl(root);

  expect(index).toHaveLength(27);

  done();
});
