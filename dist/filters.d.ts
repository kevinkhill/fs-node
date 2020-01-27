import { FsNode } from ".";
export declare const onlyExt: (nodes: FsNode[], extension: string) => FsNode[];
export declare const onlyFiles: import("lodash/fp").LodashFilter2x1<FsNode>;
export declare const onlyDirs: import("lodash/fp").LodashFilter2x1<FsNode>;
