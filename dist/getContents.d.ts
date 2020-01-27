import { FsNode } from ".";
/**
 * Sugar function to handle either a file or dir node.
 */
export declare function getContents(node: FsNode): Promise<string | FsNode[]>;
