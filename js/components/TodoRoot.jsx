import React, { Component } from 'react';
import Router, { Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';

import TodoApp from './TodoApp';

/**
 * Top level component which handles routing.
 */
export default class TodoRoot extends Component {
  render() {
    return (
      <Router history={history}>
        <Route name="all" path="/" component={TodoApp}>
          <Route name="active" path="active" />
          <Route name="completed" path="completed" />
        </Route>
      </Router>
    );
  }
}
