var path = require('path');

var webpack = require('webpack');

var LodashPlugin = require('lodash-webpack-plugin');

var config = {
  entry: './lib/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    library: 'BpmnModdle',
    libraryTarget: 'umd'
  },
  target: 'node',
  node: {
    __dirname: true,
    __filename: true,
  },
  module: {
    rules: [{
      use: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/
    }]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new LodashPlugin({
      'collections': true
    })
  ],
  devtool: 'source-map'
};

var env = process.env.NODE_ENV;

if (env === 'production') {
  config.resolve = {
    alias: {
      lodash: 'lodash-es'
    }
  };
}

module.exports = config;