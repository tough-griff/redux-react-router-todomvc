'use-strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,

  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
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
        loaders: ['react-hot', 'babel'],
        test: /\.jsx?$/,
        exclude: /node_modules/
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
