module.exports = {
  preset: "ts-jest",
  moduleNameMapper: {
    // resolve the "@/*" path mapping from the `tsconfig.json` file.
    "^@/(.*)$": "<rootDir>/$1",
  },
}
