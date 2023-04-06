/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  projects: [{
    preset: 'ts-jest',
    displayName: 'jsonld-tools',
    testMatch: ['<rootDir>/**/*test.ts'],
    rootDir: './transformations/jsonld-tools/'
  }],
};