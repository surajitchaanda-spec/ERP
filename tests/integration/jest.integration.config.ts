import type { Config } from 'jest';

const config: Config = {
  rootDir: '../../',
  testMatch: ['<rootDir>/tests/integration/**/*.test.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node'
};

export default config;
