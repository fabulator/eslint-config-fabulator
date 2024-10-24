// eslint-disable-next-line canonical/filename-no-index
const jestConfig = require('./jest');
const reactConfig = require('./react');

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:canonical/recommended',
    'plugin:import/recommended',
    'plugin:array-func/recommended',
    'plugin:prettier/recommended',
  ],
  overrides: [
    {
      files: ['*.test.*'],
      ...jestConfig,
    },
    {
      files: ['*.*sx'],
      ...reactConfig,
    },
    {
      extends: ['plugin:react-hooks/recommended'],
      files: ['use*.*sx', 'use*.js', 'use*.ts'],
      rules: {
        'react-hooks/exhaustive-deps': 'error',
        'react-hooks/rules-of-hooks': 'error',
      },
    },
    {
      extends: [
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:typescript-sort-keys/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
      ],
      files: ['*.tsx', '*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            ignoreRestSiblings: true,
            vars: 'all',
          },
        ],
        '@typescript-eslint/non-nullable-type-assertion-style': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
      },
    },
    {
      files: ['*.json'],
      plugins: ['json-format'],
      rules: {
        'json/sort-package-json': [2, 'standard'],
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  plugins: ['filenames'],
  reportUnusedDisableDirectives: true,
  rules: {
    'canonical/destructuring-property-newline': 0,
    'canonical/export-specifier-newline': 0,
    'canonical/filename-no-index': 'error',
    'canonical/import-specifier-newline': 0,
    'filenames/match-exported': [2, null, '\\.config.js$'],
    'no-irregular-whitespace': 0,
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
      },
    ],
  },
};
