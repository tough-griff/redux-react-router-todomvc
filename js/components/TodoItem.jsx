import { Record } from 'immutable';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

import TodoTextInput from './TodoTextInput';

/**
 * Represents a single todo item in a todo list.
 */
export default class TodoItem extends Component {
  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    markTodo: PropTypes.func.isRequired,
    todo: PropTypes.instanceOf(Record).isRequired
  }

  state = {
    isEditing: false
  }

  onDestroy = () => {
    const { deleteTodo, todo } = this.props;

    deleteTodo(todo.id);
  }

  onEdit = () => {
    this.setState({
      isEditing: true
    });
  }

  onSave = (label) => {
    const { deleteTodo, editTodo, todo } = this.props;
    const { id } = todo;

    if (label.length) {
      editTodo(id, label);
    } else {
      deleteTodo(id);
    }

    this.setState({
      isEditing: false
    });
  }

  onToggle = () => {
    const { markTodo, todo } = this.props;
    const { id, isComplete } = todo;

    markTodo(id, !isComplete);
  }

  renderInput() {
    if (!this.state.isEditing) return null;

    return (
      <TodoTextInput
        className="edit"
        onSave={this.onSave}
        value={this.props.todo.label}
      />
    );
  }

  render() {
    const { isComplete, label } = this.props.todo;

    const classes = classnames({
      completed: isComplete,
      editing: this.state.isEditing
    });

    return (
      <li className={classes}>
        <div className="view">
          <input
            checked={isComplete}
            className="toggle"
            onChange={this.onToggle}
            type="checkbox"
          />
          <label onDoubleClick={this.onEdit}>
            {label}
          </label>
          <button className="destroy" onClick={this.onDestroy} />
        </div>
        {this.renderInput()}
      </li>
    );
  }
}
