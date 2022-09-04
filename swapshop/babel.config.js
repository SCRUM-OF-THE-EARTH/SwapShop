module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', '@babel/preset-env', '@babel/preset-react'],
    plugins: ['react-native-reanimated/plugin'],
    env: {
      test: {
        plugins: ["@babel/plugin-transform-runtime"]
      }  
    }
  }
};
