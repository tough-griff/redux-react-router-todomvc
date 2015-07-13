import React, { Component } from 'react';

// import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';

/**
 * Wrapper component rendering header text as well as the new Todo input
 * component.
 */
export default class TodoHeader extends Component {
  handleSave(label) {
    if (label) return;

    // TodoActions.create(label);
    console.log(label);
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <TodoTextInput
          className="new-todo"
          placeholder="What needs to be done?"
          onSave={this.handleSave}
        />
      </header>
    );
  }
}
