/** @type {import('bili').Config} */
module.exports = {
  input: "src/index.ts",
  output: {
    format: ["esm", "cjs"]
  },
  plugins: {
    //   typescript2: {
    //     tsconfigOverride: {
    //       include: ["src"]
    //     }
    //   }
    // delete: { targets: "dist/*" }
  }
};
