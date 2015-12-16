export App from './App';
export DevTools from './DevTools';

let Root;

if (__DEVELOPMENT__) {
  Root = require('./Root.dev').default;
} else {
  Root = require('./Root.prod').default;
}

export { Root };
