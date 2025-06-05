module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    node: true,
    es2021: true,
  },
  ignorePatterns: [
    'node_modules/',
    '.turbo/',
    'dist/',
    'build/',
    'apps/web-app/.next/',
    'apps/expo-app/node_modules/', // Expo might have its own specific linting
    'apps/web-app/node_modules/'   // Web app might have its own specific linting
  ],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn'
  },
};
