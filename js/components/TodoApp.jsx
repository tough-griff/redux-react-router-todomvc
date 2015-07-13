import React, { Component } from 'react';

import TodoFooter from './TodoFooter';
import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

/**
 * Top-level application container component. Passes the store's state through
 * as props, as necessary.
 */
export default class TodoApp extends Component {
  render() {
    return (
      <div>
        <TodoHeader />
        <TodoList todos={[]} />
        <TodoFooter todos={[]} />
      </div>
    );
  }
}
