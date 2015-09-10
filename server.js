'use-strict';

var config = require('./webpack.config');
var express = require('express');
var jsonServer = require('json-server');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);
var dbServer = jsonServer.create();

// === Configure Webpack middleware ===
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// === Serve static files and index.html ===
app.use('/assets/css', express.static('css'));

// Serve index.html from all URL's, allowing use of React Router.
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

// === Run the json-server as a separate server app on a different port ===
dbServer.use(jsonServer.defaults);
dbServer.use(jsonServer.router('db.json'));
dbServer.listen(9090, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('DB Server listening at localhost:9090');
});
