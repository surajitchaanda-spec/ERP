import type { Config } from 'jest';

const config: Config = {
  roots: ['<rootDir>/packages/shared-ui/src', '<rootDir>/packages/shared-services/src'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@shared-ui/(.*)$': '<rootDir>/packages/shared-ui/src/$1',
    '^@shared-services/(.*)$': '<rootDir>/packages/shared-services/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy'
  }
};

export default config;
