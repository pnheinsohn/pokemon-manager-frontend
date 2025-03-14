
import js from './src/eslint/eslint-js.js';
import react from './src/eslint/eslint-react.js';
import ts from './src/eslint/eslint-ts.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  js,
  ...ts,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    ignores: ['**/*.config.{js,cjs,mjs}'],
  },
  {
    ...react,

    rules: {
      ...react.rules,

      'react/destructuring-assignment': ['error', 'always', { destructureInSignature: 'always' }],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
