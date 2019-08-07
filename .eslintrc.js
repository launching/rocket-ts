module.exports = {
  extends: ['@vue/typescript', 'plugin:vue/essential', '@vue/airbnb'],

  parserOptions: {
    parser: '@typescript-eslint/parser',
  },

  root: true,

  env: {
    node: true,
    'jest/globals': true,
  },

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'object-curly-newline': 'off',
  },
  plugins: ['jest'],
};
