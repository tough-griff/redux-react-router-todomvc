import classnames from 'classnames';
import React, { PropTypes } from 'react';

// import TodoActions from '../actions/TodoActions';
import TodoTextInput from './TodoTextInput';
import todoShape from './propShapes/todoShape';

/**
 * Represents a single todo item in a todo list.
 */
const TodoItem = React.createClass({
  propTypes: {
    todo: PropTypes.shape(todoShape).isRequired
  },

  getInitialState() {
    return {};
  },

  handleDestroy() {
    // TodoActions.destroy(this.props.todo.id);
    console.log(this.props.todo.id);
  },

  handleEdit() {
    this.setState({
      isEditing: true
    });
  },

  handleSave(label) {
    // TodoActions.update(this.props.todo.id, {
      // label: label
    // });
    console.log(label);

    this.setState({
      isEditing: false
    });
  },

  handleToggle() {
    const { todo } = this.props;

    // TodoActions.update(todo.id, {
      // isComplete: !todo.isComplete
    // });
    console.log(!todo.isComplete);
  },

  renderInput() {
    if (!this.state.isEditing) return null;

    return (
      <TodoTextInput
        className="edit"
        value={this.props.todo.label}
        onSave={this.handleSave}
      />
    );
  },

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
            className="toggle"
            type="checkbox"
            checked={todo.isComplete}
            onChange={this.handleToggle}
          />
        <label onDoubleClick={this.handleEdit}>{todo.label}</label>
          <button className="destroy" onClick={this.handleDestroy} />
        </div>
        {this.renderInput()}
      </li>
    );
  }
});

export default TodoItem;
