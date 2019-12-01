module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint'
  ],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking'
  ],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 2017,
    // sourceType:  'module',
  },
  ignorePatterns: [
    "dist/",
    "webpack.config.js"
  ],
  rules: {
    "import/prefer-default-export": "off"
  }
}
