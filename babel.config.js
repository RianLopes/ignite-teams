module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ["./src"],
          alias: {
            '@assets': './src/assets',
            '@components': './src/components',
            '@storage': './src/storage',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  };
};
