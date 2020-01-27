/// <reference types="lodash" />
import { FsNode } from ".";
export declare const isSetupNode: (node: FsNode) => boolean;
export declare const hasSetupNode: import("lodash/fp").LodashSome1x1<FsNode>;
export declare const hasSetupInfo: import("lodash/fp").LodashSome1x1<object | import("lodash").List<FsNode>>;
export declare function getSetupInfo(node: FsNode, relpath?: string): Promise<FsNode | undefined>;
