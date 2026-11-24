# eslint-config-fabulator

Shared ESLint **flat config** for Fabulator projects, published to npm. ESM package (`"type": "module"`), Apache-2.0.

## Structure

- `index.js` – the whole config, built with `defineConfig([...])` (from `eslint/config`). Philosophy: **everything strict** – always pick the strictest preset, and the exported config is post-processed by `warningsToErrors`, so every `warn` coming from presets becomes `error`. Blocks in order:
  - `eslint-plugin-unicorn` `recommended` minus opinionated rules (naming/filename case, `no-null`, `no-array-reduce`…; each `off` has a comment why). `unopinionated` is intentionally not used – it also drops many correctness rules. It replaced `eslint-plugin-array-func` (fully duplicated).
  - `@eslint/js` recommended + strict core rules (`eqeqeq`, size limits `max-lines`/`max-lines-per-function`/`complexity`/`max-depth` – the per-function limit is off in tests)
  - `@eslint-community/eslint-plugin-eslint-comments` recommended – disable comments need a `-- description`; rules in `UNDISABLEABLE_RULES` can't be disabled at all
  - `@vitest/eslint-plugin` recommended – only `**/*.test.{js,ts,jsx,tsx}` and only when `vitest` is resolvable from the project root (`process.cwd()`); projects testing with e.g. `node:test` get no Vitest rules (`all` is intentionally not used, it contains mutually contradicting rules)
  - `eslint-plugin-import-x` recommended + extra rules (no default export except `**/*.config.*s`, ordered imports, no cycles…), `typescript` preset for TS files
  - `eslint-plugin-react-hooks` `recommended-latest` – `use*` files and `*.jsx/tsx`
  - `@eslint-react/eslint-plugin` `strict` (`*.jsx`) / `strict-type-checked` (`*.tsx`) + `eslint-plugin-jsx-a11y-x` `strict`. Hook rules duplicated by `react-hooks` are turned off in `@eslint-react` (`reactHooksDuplicates`).
  - `typescript-eslint` `strictTypeChecked` + `stylisticTypeChecked` – TS files (consumers must provide `parserOptions.projectService`/`project`)
  - globals browser + node, `import-x/resolver-next` with TypeScript + node resolvers
  - `eslint-plugin-prettier/recommended` with `singleQuote: true`, then `curly: all` (must come after, eslint-config-prettier turns `curly` off)
- Runtime plugins are `dependencies` (consumers get them transitively); `eslint` and `typescript` are `peerDependencies`.

## Commands

- `npm run lint` / `npm run lint:fix` – lints the repo with its own config (`test/fixtures/` ignored – they contain intentional errors).
- `npm test` – `node:test` in `test/config.test.js` lints `test/fixtures/` (typed, `projectService`) and asserts every plugin reports its expected rules and everything is an error. When adding a rule/plugin, add a violation to a fixture and the rule id to `EXPECTED_RULES`.
- `npm run release` – semantic-release (CI only).

## Release & commits

- GitHub Actions (`.github/workflows/main.yml`) on every push: `npm ci` → `npm run lint`; on `master` also `npm run release`, which publishes to npm automatically.
- npm publishing uses **trusted publishing (OIDC)** – needs `id-token: write` in the workflow and the trusted publisher (repo + `main.yml`) configured on npmjs.com. The classic `NPM_TOKEN` requires 2FA OTP and fails in CI with `EOTP`.
- Version is derived from commit messages by semantic-release – never bump `version` in `package.json` by hand.
- Commit messages are checked by commitlint (husky `commit-msg` hook, `commitlint-config-fabulator`): `<Type>: <subject>` with no scope, type in PascalCase, one of `Changed`, `Fixed`, `Removed`, `Added`, `Depreciated`, `Docs`, `Test`, `InProgress`, `WIP`, `Refactored`.
- Release type (`semantic-release-config-fabulator`): `BREAKING` anywhere in a commit **subject** → major (a `BREAKING CHANGE:` footer is NOT recognized); `Removed` → major; `Changed`/`Added`/`Refactored`/`Depreciated` → minor; `Fixed`/`Docs` → patch. `NO_RELEASE` in the latest commit subject skips the release.
- Shared configs: `semantic-release-config-fabulator`, `commitlint-config-fabulator`, Renovate `extends: ["fabulator"]`.

## Dependency upgrades

Renovate opens most update PRs. Before bumping majors, check plugin `peerDependencies` (`npm view <pkg> peerDependencies`). Notes (as of 2026-11):

- Runs on **ESLint 10**. `eslint-plugin-import`, `eslint-plugin-react` and `eslint-plugin-jsx-a11y` don't support it, so they were replaced by `eslint-plugin-import-x`, `@eslint-react/eslint-plugin` and `eslint-plugin-jsx-a11y-x`. Don't bring the originals back.
- `import-x/no-unused-modules` is a no-op on ESLint 10 (FileEnumerator API removed) – don't re-enable it until import-x implements an alternative.
- **TypeScript 7** is blocked: `typescript-eslint` 8.x supports TS `<6.1` → keep `typescript` on `~6.0`.

Changing `peerDependencies` or rule names/prefixes affects consumers – it is a breaking change and the commit subject must contain `BREAKING` so semantic-release bumps the major.
