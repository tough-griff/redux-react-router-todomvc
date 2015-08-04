import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { DropTarget } from 'react-dnd';

import { Items } from '../constants';

const footerTarget = {
  canDrop(props, monitor) {
    return monitor.getItem().index < props.maxIndex;
  },

  drop(props, monitor) {
    const { moveTodo, maxIndex } = props;
    moveTodo(monitor.getItem().index, maxIndex + 1);
  }
};

/**
 * Manages routing using ReactRouter.Link, as well as renders a
 * 'Clear complete' button and complete tasks counter.
 */
@DropTarget(Items.TODO, footerTarget, (connect, monitor) => ({
  canDrop: monitor.canDrop(),
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))
export default class TodoFooter extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    clearCompleteTodos: PropTypes.func.isRequired,
    completeCount: PropTypes.number.isRequired,
    incompleteCount: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    maxIndex: PropTypes.number.isRequired,
    moveTodo: PropTypes.func.isRequired
  }

  onRemoveCompleted = () => {
    this.props.clearCompleteTodos();
  }

  renderClearButton() {
    if (!this.props.completeCount) return null;

    return (
      <button
        className="clear-completed"
        onClick={this.onRemoveCompleted}
      >
        Clear complete
      </button>
    );
  }

  renderTodoCount() {
    const { incompleteCount } = this.props;
    const incompleteWord = incompleteCount || 'No';
    const itemWord = (incompleteCount === 1) ? 'task' : 'tasks';

    return (
      <span className="todo-count">
        <strong>{incompleteWord}</strong> {itemWord} remaining
      </span>
    );
  }

  render() {
    const { canDrop, isOver, connectDropTarget } = this.props;
    const classes = classnames('footer', {
      over: isOver && canDrop
    });

    return connectDropTarget(
      <footer className={classes}>
        {this.renderTodoCount()}
        <ul className="filters">
          <li>
            <Link activeClassName="selected" to="/todos/all">All</Link>
          </li>
          <li>
            <Link activeClassName="selected" to="/todos/active">Active</Link>
          </li>
          <li>
            <Link activeClassName="selected" to="/todos/completed">Completed</Link>
          </li>
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
