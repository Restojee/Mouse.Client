module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parser: "@typescript-eslint/parser",
    plugins: ["react-refresh", "prettier", "react", "react-perf"],
    rules: {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],

        "react-refresh/only-export-components": [
            "warn",
            {allowConstantExport: true}
        ],
        "prettier/prettier": ["error", {"endOfLine": "auto"}],

        // CLAUDE.md: no anonymous functions in JSX props (onClick={() => ...})
        // All handlers must be extracted to variables or hook-returned functions
        "react/jsx-no-bind": [
            "warn",
            {
                allowArrowFunctions: false,
                allowBind: false,
                allowFunctions: false,
                ignoreDOMComponents: false,
                ignoreRefs: true
            }
        ],

        // CLAUDE.md: no && / || short-circuits that can render unexpected values (e.g. 0)
        "react/jsx-no-leaked-render": ["warn", { "validStrategies": ["ternary", "coerce"] }],

        // CLAUDE.md: no new objects/arrays/functions created inline in JSX props —
        // they break referential equality and prevent memoization from working
        "react-perf/jsx-no-new-object-as-prop": "warn",
        "react-perf/jsx-no-new-array-as-prop": "warn",
        "react-perf/jsx-no-new-function-as-prop": "warn"
    }
};
