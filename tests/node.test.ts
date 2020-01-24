import { any } from "lodash/fp";
import path from "path";
import { FsNode } from "../src";
import { cd, getFiles, node, getDirs } from "../src/fp";


let root: FsNode;

beforeEach(() => {
  root = node(path.join(__dirname, "vault"));
});

test('Test cd from root to "misc"', async (done) => {
  const miscDir = await cd(root, "misc");
  const miscFiles = await getFiles(miscDir);

  expect(miscFiles).toHaveLength(1);
  expect(any(["name", "test_1.nc"], miscFiles)).toBeTruthy();

  done();
});

test('Test extension filter creation function on getFiles', async (done) => {
  const sys1Dir = await cd(root, "sys_1");
  const sys1DirFolders = await getDirs(sys1Dir);

  expect(sys1DirFolders).toHaveLength(2);
  expect(any(["name", "part_A"], sys1DirFolders)).toBeTruthy();
  expect(any(["name", "part_B"], sys1DirFolders)).toBeTruthy();

  done();
});
