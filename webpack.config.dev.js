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
    path: path.join(__dirname, 'assets', 'js'),
    filename: 'bundle.js',
    publicPath: '/assets/js/'
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
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ]
};
