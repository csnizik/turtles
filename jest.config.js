module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@arcgis/.*)'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__tests__/App.js',
  },
  setupFilesAfterEnv: ['./src/setupTestSuite.js'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  coverageDirectory: '<rootDir>/src/__tests__/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
};
