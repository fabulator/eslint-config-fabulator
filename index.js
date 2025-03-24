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
import jsxA11y from 'eslint-plugin-jsx-a11y';
import vitest from '@vitest/eslint-plugin';

// eslint-disable-next-line import/no-default-export
export default defineConfig([
  {
    extends: [arrayFunc.configs.recommended],
    rules: { 'array-func/prefer-array-from': 0 },
  },
  {
    extends: [js.configs.recommended],
    rules: { 'no-irregular-whitespace': 'off', 'no-console': 'error' },
  },
  {
    files: ['**/*.test.ts', '**/*.test.js', '**/*.test.jsx', '**/*.test.tsx'],
    plugins: {
      vitest,
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    extends: [importPlugin.flatConfigs.recommended],
    rules: {
      'import/no-deprecated': 'error',
      'import/no-empty-named-blocks': 'error',
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.config.js',
            '**/*.config.ts',
            '**/*.setup.ts',
            '**/*.test.ts',
            '**/*.test.tsx',
            '**/lang/**/*.*',
          ],
        },
      ],
      'import/no-mutable-exports': 'error',
      'import/no-unused-modules': 'error',
      'import/no-cycle': 'error',
      'import/no-relative-packages': 'error',
      'import/no-self-import': 'error',
      'import/order': ['error', { 'newlines-between': 'never' }],
      'import/no-default-export': 'error',
      'import/newline-after-import': 'error',
      'import/first': 'error',
    },
  },
  {
    files: ['**/*.config.*s'],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  {
    plugins: {
      canonical: canonical,
    },
  },
  {
    extends: [reactHooks.configs['recommended-latest']],
    files: ['**/use*.*sx', '**/use*.js', '**/use*.ts', '**/*.tsx', '**/*.jsx'],
    rules: {
      'react-hooks/exhaustive-deps': 'error',
      'react-hooks/rules-of-hooks': 'error',
    },
  },
  {
    extends: [
      reactPlugin.configs.flat.recommended,
      jsxA11y.flatConfigs.recommended,
    ],
    files: ['**/*.tsx', '**/*.jsx'],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/display-name': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowAny: false,
          allowBoolean: false,
          allowNullish: false,
          allowNumber: true,
          allowRegExp: false,
          allowNever: false,
        },
      ],
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/non-nullable-type-assertion-style': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 0,
    },
  },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaVersion: 'latest' },
    },
    linterOptions: {
      reportUnusedInlineConfigs: 'error',
      reportUnusedDisableDirectives: 'error',
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
