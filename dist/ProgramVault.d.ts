import { FilterList, FsNode, GetFilesOptions, VaultOptions } from "./types";
export declare class FsVault {
    root: string;
    currentDir: string;
    whitelist: FilterList;
    blacklist: FilterList;
    index: string[];
    private _path;
    private _fs;
    private _readdirp;
    /**
     * Return `this.cwd` as an absolute path
     */
    get cwd(): string;
    constructor(options?: VaultOptions);
    /**
     * Set a new root directory for the vault
     */
    setRoot(rootPath: string): void;
    /**
     * Behaves the same way `cd` does, with `/` acting as `this.root`
     */
    cd(fspath?: string): this;
    /**
     * Get a listing of all the files from `this.root`
     */
    getIndex(): Promise<string[]>;
    /**
     * Rescan the vault for files and populate the index
     */
    rebuildIndex(): Promise<void>;
    /**
     * Check if `this.cwd` has a "SETUP_INFO" folder inside
     *
     * If `path` is given, then it will be used instead of `this.cwd`
     */
    hasSetupInfo(relpath?: string): Promise<boolean>;
    /**
     * Get the "SETUP_INFO" dir from `this.cwd`
     *
     * If `path` is given, then it will be used instead of `this.cwd`
     */
    getSetupInfo(relpath?: string): Promise<FsNode[]>;
    /**
     * Retrive a listing of all `FsNode` in `this.cwd`
     *
     * If `path` is given, then it will be used instead of `this.cwd`
     */
    getContents(relpath?: string): Promise<FsNode[]>;
    /**
     * Get a listing of all directory `FsNode` in `this.cwd`
     */
    getDirs(relpath?: string): Promise<FsNode[]>;
    /**
     * Get a listing of all the file `FsNode` in `this.cwd`
     *
     * Use the `{ dotfiles }` option to reveal `.*` files if needed
     */
    getFiles(options?: GetFilesOptions): Promise<FsNode[]>;
    /**
     * Read a directory for files
     */
    private readdir;
    /**
     * Recusively read a directory for files
     */
    private readdirp;
    /**
     * Build a path from path pieces relative to `this.root`
     */
    private joinRoot;
    /**
     * Build a path from path pieces relative to `this.cwd`
     */
    private joinPath;
    /**
     * Create a new {@link FsNode} from a Dirent
     */
    private createFsNode;
}
