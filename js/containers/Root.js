if (__DEVELOPMENT__) {
  module.exports = require('./Root.dev');
} else {
  module.exports = require('./Root.prod');
}
