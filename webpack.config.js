'use-strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,

  entry: {
    app: [
      'webpack-hot-middleware/client',
      './js/index'
    ]
  },

  output: {
    path: path.join(__dirname, 'assets'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },

  module: {
    preLoaders: [
      {
        loader: 'eslint',
        test: /\.jsx?$/,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules']
  },

  debug: true,

  devtool: 'eval',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}
