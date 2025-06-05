module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // 'expo-router/babel' was removed as it's deprecated in SDK 50+.
      // babel-preset-expo now handles the necessary transformations for Expo Router.
    ],
  };
};
