import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginPrettier from 'eslint-plugin-prettier';
import configPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Apply to JavaScript and JSX files
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },

  // Define global browser variables
  {
    languageOptions: {
      globals: globals.browser,
    },
  },

  // Recommended ESLint rules for JavaScript and React
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,

  // Prettier plugin and configuration to handle formatting issues
  pluginPrettier.configs.recommended, // Apply Prettier's ESLint configuration
  configPrettier, // Turn off conflicting ESLint rules with Prettier

  // Enforce Prettier formatting as an error
  {
    rules: {
      'prettier/prettier': 'error', // Ensure Prettier formatting issues are treated as errors
    },
  },
];
