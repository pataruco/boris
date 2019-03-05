module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  preset: 'jest-puppeteer',
  // globalSetup: 'jest-environment-puppeteer/setup',
  // globalTeardown: 'jest-environment-puppeteer/teardown',
  // testEnvironment: 'jest-environment-puppeteer',
};
