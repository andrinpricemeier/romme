/* eslint-env node */
module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint", "prettier"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier"
    ],
    rules: {
        "no-control-regex": 0,
        "prettier/prettier": [
            "error",
            {
                endOfLine: "auto"
            }
        ]
    }
};
