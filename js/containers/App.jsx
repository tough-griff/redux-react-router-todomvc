import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { TodoRouter } from '../components';
import * as reducers from '../reducers';

const composedCreateStore = compose(
  applyMiddleware(thunk),
  createStore
);
const reducer = combineReducers(reducers);
const store = composedCreateStore(reducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <TodoRouter />}
      </Provider>
    );
  }
}
