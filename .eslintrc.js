module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  plugins: [
    "@typescript-eslint",
  ],
  extends: ['eslint:recommended', 'plugin:prettier/recommended',
            'plugin:@typescript-eslint/eslint-recommended',
            'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
};
