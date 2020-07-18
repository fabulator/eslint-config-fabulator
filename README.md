# ESLint Config Fabulator

This is default ESlint configurations for projects for Fabulator.

## Usage

First install the package:

```nodemon
npm install eslint-config-fabulator --save-dev
```

and update you ESLint configuration:

```javascript
module.exports = {
    extends: [
        'eslint-config-fabulator',
    ],
};

```

In basic configuration following plugins are included:

- **import** - We use ECMAScript 6 modules.
- **jsdoc** - Predefined style for comments of methods.
- **promise** - Predefined style for promises.
- **compat** - To check that used features are supported by certain browsers.
- **unicorn** - Various lints.
- **filenames** - Lint file names.
- **sonar** - various piggy code detection
- **typescript**
- **array-func**

There are more extendable configurations for tests or different envs:

```javascript
module.exports = {
    extends: [
        'eslint-config-fabulator',
        'eslint-config-fabulator/eslint-config/react',
        'eslint-config-fabulator/eslint-config/jasmine',
        'eslint-config-fabulator/eslint-config/jest',
        'eslint-config-fabulator/eslint-config/babel-resolver',
    ],
};
```
