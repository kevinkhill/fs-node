export declare type FilterList = Partial<Record<string, string[]>>;
export declare type NwRequire = (id: string) => any;
export interface GetFilesOptions {
    dotfiles?: boolean;
    onlyExt?: string;
    extWhitelist?: string[];
}
export interface VaultOptions {
    root: string;
    blacklist?: {
        ext?: string[];
        filename?: string[];
    };
    whitelist?: {
        ext?: string[];
        filename?: string[];
    };
}
export interface FsNode {
    abspath: string;
    dir: string;
    ext?: string;
    isDirectory: boolean;
    isFile: boolean;
    isImage: boolean;
    name: string;
    relpath: string;
    getParent: Function;
    getContents: Function;
    getSetupInfo: Function;
}
