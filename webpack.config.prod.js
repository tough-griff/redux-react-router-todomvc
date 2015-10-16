'use-strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,

  entry: {
    app: [
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

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ]
};
