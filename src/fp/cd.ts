// import { ls } from "../fp";
// import { FsNode, FsVault } from "../index";
// import { noDotfiles, onlyFiles } from "../lib";

// /**
//  * Behaves the same way `cd` does, with `/` acting as `this.root`
//  */
// export function cd(vault: FsVault, fs = "/"): FsVault {
//   const $this = fs ? vault.clone(fs) : vault;

//   if (fspath.startsWith("/")) {
//     this.currentDir = fspath;
//   } else {
//     this.currentDir = this._path.join(this.currentDir, fspath);
//   }

//   this.ls().then(contents => (this.contents = contents));

//   return this;
// }