import React, { Component } from 'react';
import Router, { Redirect, Route } from 'react-router';
import { createHistory } from 'history';

import { TodoApp } from '.';

export default class TodoRouter extends Component {
  render() {
    return (
      <Router history={createHistory()}>
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
