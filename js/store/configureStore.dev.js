import { createHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';

import { DevTools } from '../containers';
import rootReducer from '../reducers';
import routes from '../routes';

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory, routes }),
  DevTools.instrument(),
  persistState(getDebugSessionKey()),
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
