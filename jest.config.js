module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/(?!@arcgis|@esri|@stencil/.*)'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__tests__/App.js',
    '\\.svg': '<rootDir>/src/__mocks__/svgrMock.js',
    '\\.png': '<rootDir>/src/__mocks__/svgrMock.js',
  },
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTestSuite.js',
    '<rootDir>/src/window-jest.js',
  ],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  // coverageDirectory: '<rootDir>/src/__tests__/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura'],
  // use below option to show all files in specified folders in coverage
  // report including files not touched by unit tests
  // collectCoverageFrom: [
  //   'src/components/*/*.{js,ts,tsx}',
  //   'src/containers/*/*.{js,ts,tsx}',
  // ],
};
