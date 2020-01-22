import path from "path";

import { FsVault } from ".";

(async () => {
  const vault = new FsVault({
    root: path.join(__dirname, "..", "tests", "vault")
  });

  const contents = await vault.ls();

  console.log(contents);
})();
