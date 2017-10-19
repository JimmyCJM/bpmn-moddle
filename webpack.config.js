var path = require('path');

var webpack = require('webpack');

module.exports = {
  entry: {
    'bundle': [ './lib/index.js' ],
    'bundle.min': [ './lib/index.js' ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'BpmnModdle',
    libraryTarget: 'umd'
  },
  target: 'node',
  node: false,
  externals: {
    moddle: {
      commonjs: 'moddle',
      commonjs2: 'moddle',
      amd: 'moddle',
      root: 'Moddle'
    },
    'moddle-xml': {
      commonjs: 'moddle-xml',
      commonjs2: 'moddle-xml',
      amd: 'moddle-xml',
      root: 'ModdleXML'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          babelrc: false,
          presets: [
            [ 'env', { loose: true, modules: false } ]
          ]
        }
      }
    ],
    noParse: /sax/
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      parallel: true
    })
  ],
  devtool: 'source-map'
};