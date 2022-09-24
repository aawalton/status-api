module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    // Require prettier issues to be fixed
    'prettier/prettier': ['error'],

    // Establish a unique, stable order for imports,
    // so we never have to think about organizing them,
    // with separation between internal and external modules
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external', 'internal', 'unknown'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],

    /* Named exports are always acceptable */
    'import/prefer-default-export': 'off',

    /* Void is correctly used to identify promises that we are not awaiting */
    'no-void': ["error", { "allowAsStatement": true }]
  },
  "overrides": [
    {
      files: ['*.ts', '*.tsx'], // Your TypeScript files extension

      // As mentioned in the comments, you should extend TypeScript plugins here,
      // instead of extending them outside the `overrides`.
      // If you don't want to extend any rules, you don't need an `extends` attribute.

      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  ]
};
