# fs-node
🗂️ Create a Root `FsNode`  
📂 Get some folders (They're also `FsNode`s)  
📄 Get some files (nodes!)  
🔬 It has tests ![ts-jest](https://github.com/kevinkhill/fs-node/workflows/Test/badge.svg?branch=master)  
♻️ Made from pure functions  

# Why? 
I wanted an easy way to travel around the file system. I'm also learning about functional programming and wanted a project to play with both `TypeScript` and `lodash/fp`

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
