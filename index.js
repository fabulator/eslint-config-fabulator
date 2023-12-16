// eslint-disable-next-line canonical/filename-no-index
const jestConfig = require("./jest");
const reactConfig = require("./react");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:sonarjs/recommended",
    "plugin:canonical/recommended",
    "plugin:import/recommended",
    "plugin:array-func/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.test.*"],
      ...jestConfig,
    },
    {
      files: ["*.*sx"],
      ...reactConfig,
    },
    {
      extends: ["plugin:react-hooks/recommended"],
      files: ["use*.*sx", "use*.js", "use*.ts"],
      rules: {
        "react-hooks/exhaustive-deps": "error",
        "react-hooks/rules-of-hooks": "error",
      },
    },
    {
      extends: [
        "plugin:@typescript-eslint/strict-type-checked",
        "plugin:typescript-sort-keys/recommended",
        "plugin:import/typescript",
        "plugin:prettier/recommended",
      ],
      files: ["*.tsx", "*.ts"],
      parser: "@typescript-eslint/parser",
    },
    {
      files: ["*.json"],
      plugins: ["json-format"],
      rules: {
        "json/sort-package-json": [2, "standard"],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  plugins: ["filenames"],
  reportUnusedDisableDirectives: true,
  rules: {
    "canonical/filename-no-index": "error",
    "filenames/match-exported": [2, null, "\\.config.js$"],
  },
};
