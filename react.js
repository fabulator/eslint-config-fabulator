module.exports = {
  extends: [
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:react-hooks/recommended",
  ],
  rules: {
    "jsx-a11y/label-has-associated-control": [2, { assert: "htmlFor" }],
    "react/button-has-type": "error",
    "react/display-name": 0,
    "react/function-component-definition": "off",
    "react/jsx-filename-extension": [
      "error",
      { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    ],
    "react/jsx-max-props-per-line": [
      "error",
      { maximum: 1, when: "multiline" },
    ],
    "react/jsx-no-constructed-context-values": 0,
    "react/jsx-no-useless-fragment": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-props-no-spreading": 0,
    "react/jsx-sort-props": [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
      },
    ],
    "react/no-array-index-key": "error",
    "react/no-danger": "error",
    "react/no-typos": "error",
    "react/no-unstable-nested-components": ["error", { allowAsProps: true }],
    "react/no-unused-class-component-methods": "error",
    "react/no-unused-prop-types": 0,
    "react/prefer-stateless-function": "error",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": 0,
    "react/require-default-props": 0,
    "react/state-in-constructor": "error",
  },
};
