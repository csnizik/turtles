module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__tests__/App.js',
  },
  "coverageReporters": ["json", "lcov", "text", "clover", "cobertura"]
};
