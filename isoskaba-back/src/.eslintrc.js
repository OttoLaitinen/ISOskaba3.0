const path = require('path');

module.exports = {
  parser: '@typescript-eslint/parser',

  // NOTE: using `plugin:` prefix makes it so that the corresponding
  // eslint plugin is automatically enabled and the rules are turned on
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',

    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from various plugins
    // that would conflict with prettier
    'prettier/@typescript-eslint',
    'prettier/standard',
  ],

  parserOptions: {
    project: path.join(__dirname, './tsconfig.json'),
  },

  env: {
    node: true,
    jest: true,
  },

  rules: {
    // Turn of stupid TS specific rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',

    // Enforce absolute imports to be first
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal'],
          ['parent', 'sibling', 'index'],
        ],
      },
    ],
    '@typescript-eslint/no-require-imports': 'error',

    'no-var': 'error', // No `var` plz - we are not savages anymore
    'no-console': 'warn'
  },
};