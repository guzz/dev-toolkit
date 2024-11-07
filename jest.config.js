/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '~/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  // An array of glob patterns indicating a set of files for which coverage information should be collected
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['\\.d\\.ts$', '\\.mock\\.tsx?$'],
}
