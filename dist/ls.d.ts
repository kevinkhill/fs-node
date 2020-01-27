import { FsNode } from ".";
/**
 * Retrive all {@link FsNode} from the given node
 */
export declare function ls(node: FsNode, relpath?: string): Promise<FsNode[]>;
