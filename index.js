const jestConfig = require('./jest');
const reactConfig = require('./react');

/* eslint-disable max-len */
module.exports = {
    extends: [
        'airbnb',
        'plugin:promise/recommended',
        'plugin:unicorn/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:sonarjs/recommended',
        'plugin:prettier/recommended',
    ],
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', 'src'],
                extensions: ['.js', '.ts', '.tsx', '.d.ts'],
            },
        },
        'polyfills': ['fetch', 'promises'],
    },
    rules: {
        'indent': 0, // checked by prettier
        'max-len': [2, 140],
        'no-console': 'warn',
        'complexity': [1, 6],
        'curly': [2, 'all'],
        'max-depth': [2, 5],
        'max-lines': [1],
        'max-params': [2, 5],
        'max-nested-callbacks': [2, 5],
        'max-statements': [1, 25],
        'max-statements-per-line': [2, { max: 2 }],
        'arrow-body-style': 0, // return statement sometimes needs to be surrounded by {}
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }], // allow ++ syntax for for each cycle
        'class-methods-use-this': 0, // Do not require this in class methods
        'no-empty-function': 0, // you need this to implement some interfaces
        'no-underscore-dangle': 0, // _ can be user for private methods
        'no-useless-constructor': 0, // sometimes its handy
        'no-param-reassign': 0, // for decorators it's handy
        'promise/avoid-new': 0,
        'promise/always-return': 1,
        'promise/no-return-wrap': 1,
        'promise/param-names': 1,
        'promise/catch-or-return': 2,
        'promise/no-promise-in-callback': 1,
        'promise/no-callback-in-promise': 1,
        'promise/prefer-await-to-callbacks': 2,
        'promise/prefer-await-to-then': 2,
        'compat/compat': 2,
        'filenames/match-exported': [2, null, '\\.config$'],
        'array-func/from-map': 2,
        'array-func/no-unnecessary-this-arg': 2,
        'array-func/prefer-array-from': 0, // I don't like it
        'array-func/avoid-reverse': 2,
        'unicorn/catch-error-name': [2, { name: 'exception' }],
        'unicorn/no-reduce': 0, // no reason for the rule
        'unicorn/prevent-abbreviations': 0,
        'unicorn/consistent-function-scoping': 0,
        'unicorn/no-abusive-eslint-disable': 0, // sometimes it's just need
        'unicorn/filename-case': 0,
        'unicorn/no-fn-reference-in-iterator': 0,
        'unicorn/no-null': 0,
        'import/prefer-default-export': 0, // In some cases it is not need
        'import/extensions': [2, { ts: 'never', tsx: 'never' }],
        'import/no-dynamic-require': 0, // we need dynamic import of chunks...
        'import/no-extraneous-dependencies': [2, { devDependencies: ['**/*.test.*', '**/*.config.js', '**/*.config.*'] }],
        'jsx-a11y/anchor-is-valid': 0, // rule does not exist
        'prettier/prettier': ['error', { printWidth: 140, tabWidth: 4, singleQuote: true, quoteProps: 'consistent', trailingComma: 'all' }],
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'],
            parser: '@typescript-eslint/parser',
            extends: ['plugin:@typescript-eslint/recommended'],
            rules: {
                'typescript-sort-keys/interface': 2,
                'typescript-sort-keys/string-enum': 2,
                '@typescript-eslint/explicit-module-boundary-types': 0,
                'consistent-return': 0, // types check by typescript
                'camelcase': 0, // using @typescript-eslint/camelcase
                'no-unused-expressions': 0, // conflict with typescript plugin
                'no-undef': 0, // conflict with typescript plugin
                'no-restricted-globals': 0, // conflict with typescript plugin
                'global-require': 0, // conflict with typescript plugin
                'no-unused-vars': 0, // conflict with typescript plugin
                'no-dupe-class-members': 0, // dont work for typescript
                '@typescript-eslint/explicit-function-return-type': 0,
                '@typescript-eslint/no-namespace': 0,
                '@typescript-eslint/no-parameter-properties': 0,
                '@typescript-eslint/ban-ts-ignore': 0,
                'no-shadow': 0, // conflict with typescript
            },
        },
        {
            files: ['*.test.*'],
            ...jestConfig,
        },
        {
            files: ['*.jsx', '*.tsx'],
            ...reactConfig,
        },
        {
            files: ['*.json'],
            rules: {
                'json/sort-package-json': [2, 'standard'],
            },
        },
    ],
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            impliedStrict: true,
        },
    },
    env: {
        es6: true,
        browser: true,
    },
    plugins: [
        'import',
        'promise',
        'compat',
        'unicorn',
        'filenames',
        'array-func',
        '@typescript-eslint',
        'sonarjs',
        'typescript-sort-keys',
        'prettier',
        'json-format',
    ],
};
