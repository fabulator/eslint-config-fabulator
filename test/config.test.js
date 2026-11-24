import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';
import { ESLint } from 'eslint';

const fixturesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'fixtures',
);

const eslint = new ESLint({
  cwd: fixturesDir,
  overrideConfigFile: path.join(fixturesDir, '..', '..', 'index.js'),
  overrideConfig: {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: fixturesDir },
    },
  },
});

const lint = async (file) => {
  const [result] = await eslint.lintFiles([path.join(fixturesDir, file)]);

  return result.messages;
};

/**
 * Every plugin of the config has to report at least one rule in the fixtures,
 * so a broken preset or a renamed rule fails the test.
 */
const EXPECTED_RULES = {
  'rules.ts': [
    '@eslint-community/eslint-comments/no-restricted-disable',
    '@eslint-community/eslint-comments/require-description',
    '@typescript-eslint/consistent-type-imports',
    '@typescript-eslint/explicit-module-boundary-types',
    '@typescript-eslint/no-non-null-assertion',
    '@typescript-eslint/no-unused-vars',
    '@typescript-eslint/switch-exhaustiveness-check',
    'unicorn/prefer-array-from-map',
    'curly',
    'eqeqeq',
    'import-x/no-default-export',
    'prettier/prettier',
  ],
  'Component.tsx': [
    '@eslint-react/no-array-index-key',
    'jsx-a11y-x/alt-text',
    'react-hooks/rules-of-hooks',
  ],
};

describe('eslint-config-fabulator', () => {
  for (const [file, expectedRules] of Object.entries(EXPECTED_RULES)) {
    describe(file, () => {
      it('reports the expected rules', async () => {
        const messages = await lint(file);
        const reported = new Set(messages.map((message) => message.ruleId));

        for (const rule of expectedRules) {
          assert.ok(reported.has(rule), `${rule} was not reported`);
        }
      });

      it('reports only errors and no parsing failures', async () => {
        const messages = await lint(file);

        assert.deepEqual(
          messages.filter(
            (message) => message.severity !== 2 || message.fatal === true,
          ),
          [],
        );
      });
    });
  }
});
