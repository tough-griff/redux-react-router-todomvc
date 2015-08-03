import { Record } from 'immutable';
import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import { TodoTextInput } from '.';
import Items from '../constants/Items';

const todoSource = {
  beginDrag(props) {
    return { index: props.todo.index };
  }
};

const todoTarget = {
  canDrop(props, monitor) {
    const { index } = props.todo;
    const draggedIndex = monitor.getItem().index;

    return draggedIndex !== index && draggedIndex !== index - 1;
  },

  drop(props, monitor) {
    const { moveTodo, todo } = props;
    moveTodo(monitor.getItem().index, todo.index);
  }
};

/**
 * Represents a single todo item in a todo list.
 */
@DropTarget(Items.TODO, todoTarget, (connect, monitor) => ({
  canDrop: monitor.canDrop(),
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
@DragSource(Items.TODO, todoSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))
export default class TodoItem extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    markTodo: PropTypes.func.isRequired,
    moveTodo: PropTypes.func.isRequired,
    todo: PropTypes.instanceOf(Record).isRequired
  }

  state = {
    isEditing: false
  }

  onDestroy = () => {
    // FIXME
    // const { deleteTodo, todo: { id }} = this.props;
    const { deleteTodo, todo } = this.props;
    const { id } = todo;

    deleteTodo(id);
  }

  onEdit = () => {
    this.setState({
      isEditing: true
    });
  }

  onSave = (label) => {
    // FIXME
    // const { deleteTodo, editTodo, todo: { id }} = this.props;
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
    // FIXME
    // const { markTodo, todo: { id, isComplete }} = this.props;
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
    // FIXME
    const { canDrop, connectDragSource, connectDropTarget, isDragging, isOver, todo } = this.props;
    const { isComplete, label } = todo;

    const classes = classnames({
      completed: isComplete,
      dragging: isDragging,
      'dragging-over': isOver && canDrop,
      editing: this.state.isEditing
    });

    return connectDragSource(connectDropTarget(
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
    ));
  }
}
