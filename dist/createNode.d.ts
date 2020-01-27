import { FsNode } from ".";
/**
 * Create a new {@link FsNode} from an absolute path
 *
 * If another node is given, then a new node will be
 * created from that node as the root and the path as
 * relative.
 */
export declare function createNode(abspath: string, fromNode?: FsNode): Promise<FsNode>;
