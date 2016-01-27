import classnames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import { Link } from 'react-router';

import { Items } from '../constants';

const target = {
  canDrop(props, monitor) {
    return monitor.getItem().index < props.maxIndex;
  },

  drop(props, monitor) {
    const { moveTodo, maxIndex } = props;
    moveTodo(monitor.getItem().index, maxIndex + 1);
  },
};

function collect(connect, monitor) {
  return {
    canDrop: monitor.canDrop(),
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  };
}

/**
 * Manages routing using ReactRouter.Link, as well as renders a
 * 'Clear complete' button and complete tasks counter.
 *
 * @note: we pass `filter` to this component to trigger a re-render when the
 * filter changes. This allows `Link`'s `activeClassName` to work correctly.
 */
@DropTarget(Items.TODO, target, collect)
export default class Footer extends Component {
  static propTypes = {
    canDrop: PropTypes.bool.isRequired,
    clearCompleteTodos: PropTypes.func.isRequired,
    completeCount: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    incompleteCount: PropTypes.number.isRequired,
    isOver: PropTypes.bool.isRequired,
    maxIndex: PropTypes.number.isRequired,
    moveTodo: PropTypes.func.isRequired,
  };

  onRemoveCompleted = () => {
    this.props.clearCompleteTodos();
  };

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
      over: isOver && canDrop,
    });

    return connectDropTarget(
      <footer className={classes}>
        {this.renderTodoCount()}
        <ul className="filters">
          <li><Link activeClassName="selected" to="all">All</Link></li>
          <li><Link activeClassName="selected" to="active">Active</Link></li>
          <li><Link activeClassName="selected" to="completed">Completed</Link></li>
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}
