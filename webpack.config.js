var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    App: './app/assets/scripts/App.js',
    Vendor: './app/assets/scripts/Vendor.js'
  },
  output: {
    path: path.resolve(__dirname, './app/temp/scripts'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['@babel/env']
        },
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
