module.exports = {
  preset: "ts-jest",
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/', 
    '/tests/',
    "src/app.ts",
    "src/swagger/",
    "src/routes/"
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts'],
  testMatch: ["**/tests/**/*.test.ts"]
};
