module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-typescript'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ts', '.tsx', '.js', '.json'],
          alias: {
            '@ui': './src/shared/ui',
            '@api': './src/shared/api',
            '@features': './src/features'
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
