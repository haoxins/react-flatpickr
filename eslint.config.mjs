import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-ts-react-hooks';

export default tseslint.config(
  {ignores: ['build']},
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {},
    rules: {
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
);
