import React, { Component, PropTypes } from 'react';

import TodoTextInput from './TodoTextInput';

/**
 * Wrapper component rendering header text as well as the new Todo input
 * component.
 */
export default class TodoHeader extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  handleSave(label) {
    if (!label.length) return;

    this.props.addTodo(label);
  }

  render() {
    return (
      <header className="header">
        <h1>Todos</h1>
        <TodoTextInput
          className="new-todo"
          onSave={::this.handleSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
