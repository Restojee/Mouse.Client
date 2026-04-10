/** @type {import("jest").Config} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/__mocks__/styleMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/src/ui/TextEditor/**/*.test.ts?(x)"],
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
  },
  projects: [
    {
      // Pure Node tests (model functions — no DOM)
      displayName: "unit",
      preset: "ts-jest",
      testEnvironment: "node",
      moduleNameMapper: {
        "\\.module\\.css$": "<rootDir>/__mocks__/styleMock.js",
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      testMatch: ["**/src/ui/TextEditor/model/**/*.test.ts"],
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
    },
    {
      // Component tests — need jsdom
      displayName: "component",
      preset: "ts-jest",
      testEnvironment: "jest-environment-jsdom",
      moduleNameMapper: {
        "\\.module\\.css$": "<rootDir>/__mocks__/styleMock.js",
        "^@/(.*)$": "<rootDir>/src/$1",
      },
      testMatch: ["**/src/ui/TextEditor/plugins/**/*.test.tsx", "**/src/ui/Message/**/*.test.tsx"],
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
    },
  ],
};
