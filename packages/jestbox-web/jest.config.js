module.exports = {
  moduleNameMapper: {
    "^.*\\.css$": "<rootDir>/src/tests/styleMock.js"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  setupTestFrameworkScriptFile: "<rootDir>src/tests/setupTestFramework.js",
}
