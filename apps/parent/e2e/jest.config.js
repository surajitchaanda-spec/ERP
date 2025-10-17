module.exports = {
  preset: 'detox',
  testRunner: 'jest-circus/runner',
  testTimeout: 120000,
  reporters: ['detox/runners/jest/streamlineReporter'],
  testMatch: ['**/?(*.)+(e2e).[tj]s']
};
