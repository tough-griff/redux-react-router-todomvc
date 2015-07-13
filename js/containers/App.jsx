import React, { Component } from 'react';
import { provide } from 'react-redux';
import Router, { Redirect, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';


import { TodoApp } from '../components';
import * as reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

@provide(store)
export default class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Route path="todos" component={TodoApp}>
          <Route path="all" />
          <Route path="active" />
          <Route path="completed" />
        </Route>
        <Redirect from="/" to="/todos/all" />
      </Router>
    );
  }
}
