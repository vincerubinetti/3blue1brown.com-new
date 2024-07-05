import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: path.dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
    },
    rules: {
      "prettier/prettier": "warn",
      "prefer-const": ["error", { destructuring: "all" }],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
];
