module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['module:@react-native/babel-preset', '@babel/preset-react'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            'moti/skeleton': 'moti/skeleton/react-native-linear-gradient',
          },
        },
      ],
    ],
  };
};
