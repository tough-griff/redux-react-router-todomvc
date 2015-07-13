'use-strict';

var jsonServer = require('json-server');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config')

var server = new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(8080, 'localhost', function(err) {
  if (err) console.log(err);

  console.log('Listening at localhost:8080');
});

var dbServer = jsonServer.create();
dbServer.use(jsonServer.defaults);
dbServer.use(jsonServer.router('db.json'));
dbServer.listen(9090, 'localhost', function(err, res) {
  if (err) console.log(err);

  console.log('DB Server listening at localhost:9090');
});
