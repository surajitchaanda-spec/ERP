module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js)'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect']
};
