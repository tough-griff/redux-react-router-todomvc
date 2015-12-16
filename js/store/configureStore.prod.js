import { createHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { reduxReactRouter } from 'redux-router';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';
import routes from '../routes';

const finalCreateStore = compose(
  applyMiddleware(thunk),
  reduxReactRouter({ createHistory, routes }),
)(createStore);

export default function configureStore(initialState) {
  return finalCreateStore(rootReducer, initialState);
}
