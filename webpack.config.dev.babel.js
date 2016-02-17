import path from 'path';
import webpack from 'webpack';

export default {
  context: __dirname,

  entry: {
    app: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './js/index',
    ],
    style: [
      'webpack-hot-middleware/client',
      './css/index.scss',
    ],
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
      loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
      test: /\.scss$/,
    }],
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories: ['node_modules'],
  },

  debug: true,

  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVELOPMENT__: true,
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
};
