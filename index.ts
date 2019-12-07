import path from "path";

import NcVault from "./src";

const vault = new NcVault({
  root: path.join(__dirname, "tests", "vault")
});

(async vault => {
  try {
    const contents = await vault.ls();

    console.log(contents);

    // console.log(await contents[1].getContents());

    const index = await vault.getIndex();

    console.log("file count", index.length);
  } catch (err) {
    console.error(err);
  }
})(vault);
