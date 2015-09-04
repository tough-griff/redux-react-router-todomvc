'use-strict';

var config = require('./webpack.config');
var express = require('express');
var jsonServer = require('json-server');
var path = require('path');
var webpack = require('webpack');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(8080, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:8080');
});

var dbServer = jsonServer.create();
dbServer.use(jsonServer.defaults);
dbServer.use(jsonServer.router('db.json'));
dbServer.listen(9090, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('DB Server listening at localhost:9090');
});
