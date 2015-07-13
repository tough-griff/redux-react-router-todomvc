import React, { Component } from 'react';
import Router, { Redirect, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import { TodoApp } from '../components';

/**
 * Top level component which handles routing.
 */
export default class Root extends Component {
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
