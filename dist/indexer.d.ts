import { FsNode } from ".";
/**
 * Scan a node for files and return a list of paths
 */
export declare function scan(node: FsNode): Promise<string[]>;
/**
 * Recusively scan a node for files
 */
export declare function crawl(node: FsNode): Promise<string[]>;
