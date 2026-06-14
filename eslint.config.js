const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  {
    ignores: ["node_modules/**", "supabase/functions/**"],
  },
  js.configs.recommended,
  {
    // Browser scripts (data.js and other front-end JS files)
    files: ["**/*.js"],
    ignores: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        ...globals.browser,
        SNU_DATA: "writable",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },
  {
    // This config file runs under Node (CommonJS)
    files: ["eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
    },
  },
];
