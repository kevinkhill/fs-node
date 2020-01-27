import { FsNode } from ".";
/**
 * Behaves the same way `cd` does, with `/` acting as `this.dest`
 */
export declare function cd(node: FsNode, dest?: string): Promise<FsNode>;
