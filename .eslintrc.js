module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  plugins: ['@typescript-eslint', 'prettier'],
};
