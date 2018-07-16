module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/airbnb'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': 0,
    'no-param-reassign': 'off',
    'indent': 0,
    'max-len': 0,
    'arrow-body-style': 0,
    'eol-last': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};