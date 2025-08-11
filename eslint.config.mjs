import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Temporarily disable problematic rules for admin code
      "@typescript-eslint/no-explicit-any": "warn", // Allow any in admin code temporarily
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_" 
      }], // Allow underscore-prefixed unused vars
      "react/no-unescaped-entities": "warn", // Don't break builds for quotes
    }
  }
];

export default eslintConfig;
