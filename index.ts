import path from "path";

import NcVault from "./src";

const vault = new NcVault({
  root: path.resolve("C:/H+405 PROGRAM VAULT")
});

(async vault => {
  vault.blacklist.ext = ["lnk", "debug"];
  // vault.cd("MISC");

  try {
    const files = await vault.getFiles();

    console.log(files);

    const index = await vault.getIndex();

    console.log(index.length);
  } catch (err) {
    console.error(err);
  }
})(vault);
