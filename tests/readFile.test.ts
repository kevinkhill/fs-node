import path from "path";

import { createNode, getFiles, getContents } from "../src";

test("creating a root node from a path", async (done) => {
  const root = await createNode(path.join(__dirname, "vault"));
  const files = await getFiles(root, "sys_1");

  const sys1File = files[0];
  expect(sys1File.name).toBe("sys_1.txt");
  expect(sys1File.ext).toBe(".txt");

  const contents = await getContents(sys1File);
  expect(contents).toBe("I love 🌮🔔\n");

  done();
});
