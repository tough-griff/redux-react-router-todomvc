import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';

import TodoTextInput from './TodoTextInput';
import todoShape from './propShapes/todoShape';

/**
 * Represents a single todo item in a todo list.
 */
export default class TodoItem extends Component {
  static propTypes = {
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    markTodo: PropTypes.func.isRequired,
    todo: PropTypes.shape(todoShape).isRequired
  }

  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  handleDestroy() {
    this.props.deleteTodo(this.props.todo.id);
  }

  handleEdit() {
    this.setState({
      isEditing: true
    });
  }

  handleSave(label) {
    const { id } = this.props.todo;

    if (label.length) {
      this.props.editTodo(id, label);
    } else {
      this.props.deleteTodo(id);
    }

    this.setState({
      isEditing: false
    });
  }

  handleToggle() {
    const { todo } = this.props;

    this.props.markTodo(todo.id, !todo.isComplete);
  }

  renderInput() {
    if (!this.state.isEditing) return null;

    return (
      <TodoTextInput
        className="edit"
        onSave={::this.handleSave}
        value={this.props.todo.label}
      />
    );
  }

  render() {
    const { todo } = this.props;

    const classes = classnames({
      completed: todo.isComplete,
      editing: this.state.isEditing
    });

    return (
      <li className={classes}>
        <div className="view">
          <input
            checked={todo.isComplete}
            className="toggle"
            onChange={::this.handleToggle}
            type="checkbox"
          />
          <label onDoubleClick={::this.handleEdit}>
            {todo.label}
          </label>
          <button className="destroy" onClick={::this.handleDestroy} />
        </div>
        {this.renderInput()}
      </li>
    );
  }
}
