import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';

import { TextInput } from '.';
import { Items } from '../constants';

const target = {
  canDrop(props, monitor) {
    const { index } = props;
    const draggedIndex = monitor.getItem().index;

    return draggedIndex !== index && draggedIndex !== index - 1;
  },

  drop(props, monitor) {
    const { index, moveTodo } = props;
    moveTodo(monitor.getItem().index, index);
  },
};

const source = {
  beginDrag(props) {
    return { index: props.index };
  },
};

function targetCollect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

function sourceCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

/**
 * Represents a single todo item in a todo list.
 */
@DropTarget(Items.TODO, target, targetCollect)
@DragSource(Items.TODO, source, sourceCollect)
export default class Todo extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    index: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    isDragging: PropTypes.bool.isRequired,
    isOver: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    markTodo: PropTypes.func.isRequired,
    moveTodo: PropTypes.func.isRequired,
  };

  state = {
    isEditing: false,
  };

  onDestroy = () => {
    const { deleteTodo, id } = this.props;

    deleteTodo(id);
  };

  onEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  onSave = (newLabel) => {
    const { deleteTodo, editTodo, id, label } = this.props;

    if (newLabel.length) {
      if (newLabel !== label) editTodo(id, newLabel);
    } else {
      deleteTodo(id);
    }

    this.setState({
      isEditing: false,
    });
  };

  onToggle = () => {
    const { id, isComplete, markTodo } = this.props;

    markTodo(id, !isComplete);
  };

  renderInput() {
    if (!this.state.isEditing) return null;

    return (
      <TextInput
        className="edit"
        onSave={this.onSave}
        value={this.props.label}
      />
    );
  }

  render() {
    const {
      canDrop, connectDragSource, connectDropTarget, isComplete, isDragging,
      isOver, label,
    } = this.props;

    const classes = classnames({
      completed: isComplete,
      dragging: isDragging,
      over: isOver && canDrop,
      editing: this.state.isEditing,
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
