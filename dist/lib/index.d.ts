import { FsNode } from "../types";
export declare const onlyFiles: import("lodash/fp").LodashFilter2x1<FsNode>;
export declare const onlyDirs: import("lodash/fp").LodashFilter2x1<FsNode>;
export declare const noFiles: import("lodash/fp").LodashReject1x1<FsNode>;
export declare const noDirs: import("lodash/fp").LodashReject1x1<FsNode>;
export declare const noDotfiles: import("lodash/fp").LodashReject1x1<FsNode>;
export declare function isSetupNode(node: FsNode): boolean;
export declare function fwdSlash(path: string): string;
export declare function getExt(filename: string): string | undefined;
