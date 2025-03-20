import { defineConfig } from 'eslint/config';
import reactPlugin from 'eslint-plugin-react';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import arrayFunc from 'eslint-plugin-array-func';
import js from '@eslint/js';
import canonical from 'eslint-plugin-canonical';
import importPlugin from 'eslint-plugin-import';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default defineConfig([
  {
    extends: [arrayFunc.configs.recommended],
    rules: { 'array-func/prefer-array-from': 0 },
  },
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  {
    plugins: {
      canonical: canonical,
    },
  },
  {
    extends: [reactHooks.configs['recommended-latest']],
    files: ['use*.*sx', 'use*.js', 'use*.ts', '*.tsx', '*.jsx'],
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
  {
    extends: [reactPlugin.configs.recommended],
    files: ['*.tsx', '*.jsx'],
  },
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: ['*.tsx', '*.ts'],
    rules: {
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
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
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaVersion: 'latest' },
    },
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        node: true,
      },
    },
  },
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
    },
  },
]);
