'use-strict';

import path from 'path';
import webpack from 'webpack';

export default {
  context: __dirname,

  entry: {
    app: [
      'babel-polyfill',
      './js/index',
    ],
    style: './css/index.scss',
  },

  output: {
    path: path.join(__dirname, 'assets'),
    filename: '[name].bundle.js',
    publicPath: '/assets/',
  },

  module: {
    preLoaders: [{
      loader: 'eslint',
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }],
    loaders: [{
      loader: 'babel',
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }, {
      loaders: ['style', 'css', 'sass'],
      test: /\.scss$/,
    }],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ],
};
