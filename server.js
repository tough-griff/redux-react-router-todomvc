'use-strict';

var config = require('./webpack.config');
var express = require('express');
var jsonServer = require('json-server');
var logger = require('morgan');
var path = require('path');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();
var compiler = webpack(config);
var dbRouter = jsonServer.router('db.json');
var port = process.env.PORT || '8080';

// Configure the logger
app.use(logger('dev', {
  skip: function(req, res) {
    return process.env.NODE_ENV === 'test' || req.path === '/favicon.ico';
  }
}));

// === Configure Webpack middleware ===
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Serve static files and index.html
app.use('/assets/css', express.static('css'));

// Host the database under /db
app.use('/api', dbRouter);

// Serve index.html from all URL's, allowing use of React Router.
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server listening at http://localhost:${port}`);
});
