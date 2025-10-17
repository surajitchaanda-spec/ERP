import type { Config } from 'jest';

const config: Config = {
  rootDir: '../../',
  testMatch: ['<rootDir>/contract-tests/pact/**/*.pact.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node'
};

export default config;
