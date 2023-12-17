const { ESLint } = require('eslint');
const fs = require('fs');

function getErrors(configFile) {
  const cli = new ESLint({
    overrideConfig: {
      env: {
        node: true,
      },
    },
    overrideConfigFile: configFile,
  });

  return cli.lintText(fs.readFileSync('./jest.js', 'utf8'));
}

describe('Validate configs by eslint', () => {
  ['index.js', 'react.js', 'jest.js'].forEach((file) => {
    it(`load config ${file} in eslint to validate all rule syntax is correct`, async () => {
      const results = await getErrors(file);
      expect(results[0].messages).toEqual([]);
    });
  });
});
