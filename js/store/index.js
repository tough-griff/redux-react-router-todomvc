let configureStore;

if (__DEVELOPMENT__) {
  configureStore = require('./configureStore.dev').default;
} else {
  configureStore = require('./configureStore.prod').default;
}

export default configureStore;
