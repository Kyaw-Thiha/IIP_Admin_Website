// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

/** @type {import("eslint").Linter.Config} */
const config = {
  overrides: [
    {
      extends: [
        // These are disabled rules in order to allow successful builds
        //"plugin:@typescript-eslint/recommended-requiring-type-checking",
      ],
      files: ["*.ts", "*.tsx"],
      parserOptions: {
        project: path.join(__dirname, "tsconfig.json"),
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: path.join(__dirname, "tsconfig.json"),
  },
  plugins: ["@typescript-eslint"],
  extends: ["next/core-web-vitals", "plugin:@typescript-eslint/recommended"],
  rules: {
    // "@typescript-eslint/consistent-type-imports": [
    //   "warn",
    //   {
    //     prefer: "type-imports",
    //     fixStyle: "inline-type-imports",
    //   },
    // ],
    // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    // These are disabled rules in order to allow successful builds
    "@typescript-eslint/no-unused-vars":
      process.env.NODE_ENV === "production"
        ? "off"
        : ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports":
      process.env.NODE_ENV === "production"
        ? "off"
        : [
            "warn",
            {
              prefer: "type-imports",
              fixStyle: "inline-type-imports",
            },
          ],
    "@typescript-eslint/no-empty-interface":
      process.env.NODE_ENV === "production" ? "off" : "warn",
  },
};

module.exports = config;
