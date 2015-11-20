import React, { Component } from 'react';
import { Redirect, Route } from 'react-router';
import { ReduxRouter } from 'redux-router';

import { TodoApp } from '.';

export default class TodoRouter extends Component {
  render() {
    return (
      <ReduxRouter>
        <Route path="todos" component={TodoApp}>
          <Route path="all" />
          <Route path="active" />
          <Route path="completed" />
        </Route>
        <Redirect from="/" to="/todos/all" />
      </ReduxRouter>
    );
  }
}
