// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');
const { FileStore } = require('metro-cache');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname; // apps/expo-app
const workspaceRoot = path.resolve(projectRoot, '../..'); // /home/project

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectRoot, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

// Metro-specific monorepo setup
config.watchFolders = [workspaceRoot];

// 2. Let Metro know where to resolve packages and assets
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// List of modules that Metro needs to be able to resolve from the workspace root.
// These are often dependencies of your direct dependencies that might be hoisted by pnpm.
// This list was built iteratively by observing Metro errors.
const modulesToResolveFromWorkspace = [
  "@expo/metro-runtime",
  "debug",
  "@babel/runtime",
  "react-refresh",
  "expo-modules-core",
  "anser",
  "react-native-helmet-async",
  "fbjs",
  "pretty-format",
  "invariant",
  "@react-native/normalize-colors",
  "@react-native/assets-registry",
  "styleq",
  "stacktrace-parser",
  "inline-style-prefixer",
  "memoize-one",
  "postcss-value-parser",
  "nullthrows",
  "css-in-js-utils",
  "hyphenate-style-name",
  "scheduler",
  "@react-navigation/core",
];

config.resolver.extraNodeModules = modulesToResolveFromWorkspace.reduce((acc, moduleName) => {
  const modulePath = path.resolve(workspaceRoot, 'node_modules', moduleName);
  if (fs.existsSync(modulePath)) {
    acc[moduleName] = modulePath;
  }
  return acc;
}, {});

// Add .ts and .tsx to assetExts, and ensure svg is handled correctly.
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'ts', 'tsx', 'mjs', 'js', 'jsx', 'json', 'cjs', 'scss', 'sass', 'css'];

// Configure Metro to use a custom cache store.
// This is important for monorepos to prevent cache conflicts.
config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, 'node_modules', '.cache', 'metro'),
  }),
];

module.exports = config;
