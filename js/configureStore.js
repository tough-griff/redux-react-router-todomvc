import { createHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

let finalCreateStore;

if (__DEVELOPMENT__ && __DEVTOOLS__) {
  const { devTools, persistState } = require('redux-devtools');
  finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ createHistory }),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  )(createStore);
} else {
  finalCreateStore = compose(
    applyMiddleware(thunk),
    reduxReactRouter({ createHistory }),
  )(createStore);
}

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
