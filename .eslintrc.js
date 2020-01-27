module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    project: "./tsconfig.json"
  },
  env: {
    es6: true,
    node: true
  },
  globals: {
    Promise: true
  },
  plugins: [
    "node",
    "import",
    "prettier",
    "lodash-fp",
    "simple-import-sort",
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended" // KEEP THIS LAST
  ],
  rules: {
    //
    // eslint base
    //

    quotes: "off",
    "sort-imports": "off",
    "no-restricted-syntax": "off",
    eqeqeq: "error",
    "no-mixed-operators": "error",
    "no-param-reassign": "error",

    //
    // lodash-fp
    //

    "lodash-fp/no-for-each": "off",
    "lodash-fp/preferred-alias": "off",
    "lodash-fp/consistent-compose": "off",
    // "lodash-fp/consistent-name": ["error", "_"],
    "lodash-fp/use-fp": "error",
    "lodash-fp/no-chain": "error",
    "lodash-fp/prefer-get": "error",
    "lodash-fp/prefer-compact": "error",
    "lodash-fp/prefer-flat-map": "error",
    "lodash-fp/no-unused-result": "error",
    "lodash-fp/no-extraneous-args": "error",
    "lodash-fp/no-argumentless-calls": "error",
    "lodash-fp/no-partial-of-curried": "error",
    "lodash-fp/no-single-composition": "error",
    "lodash-fp/no-extraneous-partials": "error",
    "lodash-fp/no-submodule-destructuring": "error",
    "lodash-fp/no-extraneous-iteratee-args": "error",
    "lodash-fp/prefer-composition-grouping": "error",
    "lodash-fp/no-extraneous-function-wrapping": "error",
    "lodash-fp/prefer-constant": [
      "error",
      {
        arrowFunctions: false
      }
    ],
    "lodash-fp/prefer-identity": [
      "error",
      {
        arrowFunctions: false
      }
    ],

    //
    // @typescript-eslint
    //

    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/ban-ts-ignore": "error",
    "@typescript-eslint/prefer-includes": "error",
    "@typescript-eslint/prefer-regexp-exec": "error",
    "@typescript-eslint/no-inferrable-types": "error",
    "@typescript-eslint/no-misused-promises": "error",
    "@typescript-eslint/consistent-type-definitions": "error",
    "@typescript-eslint/no-unnecessary-type-assertion": "error",
    "@typescript-eslint/prefer-string-starts-ends-with": "error",
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true
      }
    ],

    //
    // prettier
    //

    "prettier/prettier": "error",

    //
    // simple-import-sort
    //

    "simple-import-sort/sort": "error",

    //
    // eslint-plugin-import
    //

    "import/no-named-export": "off",
    "import/no-default-export": "off",
    "import/prefer-default-export": "off",
    "import/first": "error",
    "import/no-amd": "error",
    "import/no-unresolved": "error",
    "import/no-self-import": "error",
    "import/no-named-default": "error",
    "import/no-absolute-path": "error",
    "import/no-mutable-exports": "error",
    "import/newline-after-import": "error",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false
      }
    ]
  }
};
