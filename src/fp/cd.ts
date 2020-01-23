import { FsVault } from "..";
import { clone } from "../fp";

/**
 * Behaves the same way `cd` does, with `/` acting as `this.root`
 */
export function cd(vault: FsVault, root = "/"): FsVault {
  const $this = root ? clone(vault, root) : vault;

  if (root.startsWith("/")) {
    this.currentDir = root;
  } else {
    this.currentDir = this._path.join(this.currentDir, root);
  }

  return $this;
}
