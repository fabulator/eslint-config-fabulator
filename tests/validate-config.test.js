const eslint = require('eslint');
const fs = require('fs');

function getErrors(configFile) {
    const { CLIEngine } = eslint;

    const cli = new CLIEngine({
        configFile,
    });

    return cli.executeOnText(fs.readFileSync('./jest.js', 'utf8'));
}

describe('Validate configs by eslint', () => {
    ['index.js', 'react.js', 'jest.js'].forEach((file) => {
        it(`load config ${file} in eslint to validate all rule syntax is correct`, () => {
            expect(getErrors(file).results[0].messages).toEqual([]);
        });
    });
});
