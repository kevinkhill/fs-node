import path from "path";

import { createNode } from "../src";

test("creating a root node from a path", async (done) => {
  const rootNode = await createNode(path.join(__dirname, "vault"));

  expect(rootNode.isRoot).toBeTruthy();

  done();
});
