// Learn more https://docs.expo.io/guides/customizing-metro
// const { getDefaultConfig } = require('expo/metro-config'); // expo/metro-config is not resolving correctly
const { getDefaultConfig } = require('@expo/metro-config'); // Using @expo/metro-config directly
const { FileStore } = require('metro-cache');
const path = require('path');
const fs = require('fs');

const projectRoot = __dirname; // apps/expo-app
const workspaceRoot = path.resolve(projectRoot, '../..'); // /home/project

// Create a resolver that attempts to resolve from the project node_modules
// and then from the workspace node_modules.
// This is useful for monorepos where dependencies might be hoisted.
const createMonorepoResolver = (projectRoot, workspaceRoot) => {
  return (context, moduleName, platform) => {
    // Try resolving from project node_modules first
    try {
      return context.resolveRequest(context, moduleName, platform);
    } catch (e) {
      // If not found, try resolving from workspace node_modules
      const workspaceModuleName = path.resolve(workspaceRoot, 'node_modules', moduleName);
      if (fs.existsSync(workspaceModuleName)) {
        // This part might need adjustment based on how Metro expects resolution paths
        // For now, we're relying on extraNodeModules and shamefully-hoist
      }
      throw e; // Re-throw if not found in workspace either (or rely on Metro's default)
    }
  };
};


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

// Path to the shared packages
const sharedPackagesPath = path.resolve(workspaceRoot, 'packages');

// Aliases for shared packages (if you have them)
// config.resolver.alias = {
//   '@directdrive/core-types': path.resolve(sharedPackagesPath, 'core-types/src'),
//   '@directdrive/supabase-client': path.resolve(sharedPackagesPath, 'supabase-client/src'),
//   '@directdrive/utils': path.resolve(sharedPackagesPath, 'utils/src'),
// };

// List of modules that Metro needs to be able to resolve from the workspace root
// These are often dependencies of your direct dependencies that might be hoisted.
// This list was built iteratively by observing Metro errors.
const modulesToResolveFromWorkspace = [
  "@expo/metro-runtime", // Critical for HMR and basic Expo functionality
  "debug", // Common utility, often a deep dependency
  "@babel/runtime", // Babel helpers
  "react-refresh", // For Fast Refresh
  "expo-modules-core", // Core Expo modules
  "anser", // Used by error overlay
  "react-native-helmet-async", // If used
  "fbjs", // Facebook JavaScript utilities, often a dependency of React Native itself
  "pretty-format", // Used by Jest and other tools, sometimes by logging
  "invariant", // Utility for assertions
  "@react-native/normalize-colors", // React Native utility
  "@react-native/assets-registry", // React Native utility
  "styleq", // Style utility for React Native Web
  "stacktrace-parser", // For error reporting
  "inline-style-prefixer", // For web styling
  "memoize-one", // Utility for memoization
  "postcss-value-parser", // CSS processing
  "nullthrows", // Utility
  "css-in-js-utils", // Styling utility
  "hyphenate-style-name", // Styling utility
  "scheduler", // React's scheduler
  "@react-navigation/core", // If using React Navigation
  // Add other modules here if Metro has trouble resolving them
];

config.resolver.extraNodeModules = modulesToResolveFromWorkspace.reduce((acc, moduleName) => {
  const modulePath = path.resolve(workspaceRoot, 'node_modules', moduleName);
  if (fs.existsSync(modulePath)) {
    acc[moduleName] = modulePath;
  } else {
    // Fallback for scoped packages or packages with different structures
    // e.g. @expo/metro-runtime might be in node_modules/.pnpm/@expo+metro-runtime@version/node_modules/@expo/metro-runtime
    // This requires a more robust search or relying on pnpm's hoisting.
    // For now, we assume direct presence or pnpm handles it via shamefully-hoist.
    // console.warn(`[metro.config.js] Could not find ${moduleName} directly in workspace node_modules. Relying on hoisting.`);
  }
  return acc;
}, {});


// Add .ts and .tsx to assetExts
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg', 'ts', 'tsx', 'mjs', 'js', 'jsx', 'json', 'cjs', 'scss', 'sass', 'css'];


// Configure Metro to use a custom cache store.
// This is important for monorepos to prevent cache conflicts.
config.cacheStores = [
  new FileStore({
    root: path.join(projectRoot, 'node_modules', '.cache', 'metro'),
  }),
];

// console.log('[metro.config.js] v36 - Base monorepo config. Relying on shamefully-hoist. projectRoot:', projectRoot);
// console.log('[metro.config.js] v36 HMRClient specific alias logic removed. Relying on shamefully-hoist.');
// console.log('[metro.config.js] v36 Modules to resolve via extraNodeModules:', Object.keys(config.resolver.extraNodeModules));
// Object.entries(config.resolver.extraNodeModules).forEach(([key, value]) => {
//   console.log(`[metro.config.js] v36 Processing extraNodeModule mapping for: ${key}`);
//   console.log(`[metro.config.js] v36 Successfully mapped '${key}' to: ${value}`);
// });
// console.log('[metro.config.js] v36 Final sourceExts:', config.resolver.sourceExts);
// console.log('[metro.config.js] v36 Final extraNodeModules:', config.resolver.extraNodeModules);
// console.log('[metro.config.js] v36 Final resolver.alias:', config.resolver.alias);
// console.log('[metro.config.js] v36 Configuration complete.');


module.exports = config;
