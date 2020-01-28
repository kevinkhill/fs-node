import path from "path";

import {  FsNode,createNode, getFiles, getContents, noFiles, noDirs } from "../src";

const nodeBase = {
  abspath: "",
  relpath: "",
  root: "",
  isRoot: false,
};

function mockFileNode(name:string): FsNode {
  return Object.freeze({
    ...nodeBase,
    name,
    isFile: true,
    isDirectory: false
  });
}

function mockDirNode(name: string): FsNode {
  return Object.freeze({
    ...nodeBase,
    name,
    isFile: false,
    isDirectory: true
  });
}

test("creating a root node from a path", async (done) => {
  const files = ["file1", "file2", "file3"].map(mockFileNode);
  const dirs = ["dir1", "dir3"].map(mockDirNode);
  const contents = [...files, ...dirs];

  expect(contents).toHaveLength(5);

  expect(await noFiles(contents)).toHaveLength(2);
  expect(await noDirs(contents)).toHaveLength(3);
  done();
});
