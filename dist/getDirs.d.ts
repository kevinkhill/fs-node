import { FsNode } from ".";
/**
 * Sugar function to get only dir nodes
 */
export declare function getDirs(node: FsNode, relpath?: string): Promise<FsNode[]>;
