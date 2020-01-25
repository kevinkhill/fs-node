# fs-node
Create a node. Get some 📂s, get some 📄s. 

![ts-jest](https://github.com/kevinkhill/fs-node/workflows/Test/badge.svg?branch=master)

# Install
`yarn add fs-node`

# Usage
Import what you need. It's all functions!

```
import { createNode, getFiles } from "fs-node";

const root = createNode("/stuff");
const files = getFiles(root);

console.log(files);
// [FsNode, FsNode, FsNode]
```

# FsNode
```
{
  name: string;
  ext?: string;
  root: string;
  abspath: string;
  relpath: string;
  isRoot: boolean;
  isFile: boolean;
  isDirectory: boolean;
}

```
