module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ["**/tests/**/*.test.ts"]
};
