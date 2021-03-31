const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig')

module.exports = {
    roots: ['<rootDir>'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
    transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
    transform: {
        '^.+\\.(ts|tsx)$': 'babel-jest'
    },
    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
        '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js'
    }
}
