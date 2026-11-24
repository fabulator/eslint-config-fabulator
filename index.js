import eslintReact from '@eslint-react/eslint-plugin';
import js from '@eslint/js';
import vitest from '@vitest/eslint-plugin';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import arrayFunc from 'eslint-plugin-array-func';
import { createNodeResolver, importX } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y-x';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const JSX_FILES = ['**/*.jsx'];
const TSX_FILES = ['**/*.tsx'];
const TS_FILES = ['**/*.{ts,tsx,mts,cts}'];

// Rules covered by eslint-plugin-react-hooks (official, React Compiler based) are
// turned off in @eslint-react so that each problem is reported only once.
const reactHooksDuplicates = Object.fromEntries(
  Object.keys(
    eslintReact.configs['disable-conflict-eslint-plugin-react-hooks'].rules,
  )
    .map((rule) => rule.replace(/^react-hooks\//, '@eslint-react/'))
    .map((rule) => [rule, 'off']),
);

/**
 * Everything is strict: rules that presets enable as warnings are reported as errors.
 * @param {import('eslint').Linter.RulesRecord} rules
 * @returns {import('eslint').Linter.RulesRecord}
 */
const warningsToErrors = (rules) =>
  Object.fromEntries(
    Object.entries(rules).map(([name, entry]) => {
      const [severity, ...options] = Array.isArray(entry) ? entry : [entry];

      if (severity !== 'warn' && severity !== 1) {
        return [name, entry];
      }

      return [name, options.length > 0 ? ['error', ...options] : 'error'];
    }),
  );

const config = defineConfig([
  {
    extends: [arrayFunc.configs.all],
    rules: { 'array-func/prefer-array-from': 'off' },
  },
  {
    extends: [js.configs.recommended],
    rules: { 'no-irregular-whitespace': 'off', 'no-console': 'error' },
  },
  {
    files: ['**/*.test.{js,ts,jsx,tsx}'],
    extends: [vitest.configs.recommended],
  },
  {
    extends: [importX.flatConfigs.recommended],
    rules: {
      'import-x/no-deprecated': 'error',
      'import-x/no-empty-named-blocks': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '**/*.{test,setup,config}.{ts,tsx,js,mjs}',
            '**/lang/**/*.*',
          ],
        },
      ],
      'import-x/no-mutable-exports': 'error',
      'import-x/no-cycle': 'error',
      'import-x/no-relative-packages': 'error',
      'import-x/no-self-import': 'error',
      'import-x/order': ['error', { 'newlines-between': 'never' }],
      'import-x/no-default-export': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/first': 'error',
    },
  },
  {
    files: TS_FILES,
    extends: [importX.flatConfigs.typescript],
  },
  {
    files: ['**/*.config.*s'],
    rules: {
      'import-x/no-default-export': 'off',
    },
  },
  {
    extends: [reactHooks.configs.flat['recommended-latest']],
    files: [
      '**/use*.*sx',
      '**/use*.js',
      '**/use*.ts',
      ...JSX_FILES,
      ...TSX_FILES,
    ],
  },
  {
    extends: [eslintReact.configs.strict, jsxA11y.configs.strict],
    files: JSX_FILES,
    rules: reactHooksDuplicates,
  },
  {
    extends: [
      eslintReact.configs['strict-type-checked'],
      jsxA11y.configs.strict,
    ],
    files: TSX_FILES,
    rules: reactHooksDuplicates,
  },
  {
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    files: TS_FILES,
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
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
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
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
        createNodeResolver(),
      ],
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

// eslint-disable-next-line import-x/no-default-export
export default config.map((item) =>
  item.rules ? { ...item, rules: warningsToErrors(item.rules) } : item,
);
