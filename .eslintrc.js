module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'react/prop-types': 1,
    'react/jsx-filename-extension': 0,
    'react/destructuring-assignment': 0,
    'react/no-array-index-key': 0,
    'react/forbid-prop-types': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'consistent-return': 0,
    'no-plusplus': 0,
    'no-bitwise': 0,
  },
};
