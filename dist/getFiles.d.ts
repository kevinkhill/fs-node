import { FsNode } from ".";
/**
 * Sugar function to get only files from a node
 *
 * Provides the option to inlcude dotfiles
 */
export declare function getFiles(node: FsNode, relpath?: string, options?: {
    dotfiles: boolean;
}): Promise<FsNode[]>;
