import React, { Component, PropTypes } from 'react';

import { TextInput } from '.';

/**
 * Wrapper component rendering header text as well as the new Todo input
 * component.
 */
export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired,
    fetchAllTodos: PropTypes.func.isRequired,
  };

  onSave = (label) => {
    if (!label.length) return;

    this.props.addTodo(label);
  };

  render() {
    return (
      <header className="header">
        <h1 onDoubleClick={this.props.fetchAllTodos}>Todos</h1>
        <TextInput
          className="new-todo"
          onSave={this.onSave}
          placeholder="What needs to be done?"
        />
      </header>
    );
  }
}
