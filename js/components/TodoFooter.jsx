import _ from 'lodash';
import classnames from 'classnames';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// import TodoActions from 'actions/TodoActions';

/**
 * Manages routing using ReactRouter.Link, as well as renders a
 * 'Clear completed' button and complete tasks counter.
 */
const TodoFooter = React.createClass({
  propTypes: {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired
  },

  /**
   * Triggers the `removeCompletedItems` event.
   */
  handleRemoveCompleted() {
    // TodoActions.removeCompletedItems();
  },

  render() {
    // Calculate task numbers
    const numTasks = this.props.todos.length;
    const numComplete = _.filter(this.props.todos, 'isComplete').length;
    const numIncomplete = numTasks - numComplete;

    // Compute classes and labels
    const buttonClasses = classnames('clear-completed', {
      'hidden': !numComplete
    });
    const footerClasses = classnames('footer', {
      'hidden': !numTasks
    });
    const numTasksLabel = (numIncomplete === 1) ? 'item' : 'items';

    return (
      <footer className={footerClasses}>
        <span className="todo-count">
          <strong>{numIncomplete}</strong> {numTasksLabel} remaining
        </span>
        <ul className="filters">
          <li>
            <Link activeClassName="selected" to="all">All</Link>
          </li>
          <li>
            <Link activeClassName="selected" to="active">Active</Link>
          </li>
          <li>
            <Link activeClassName="selected" to="completed">Completed</Link>
          </li>
        </ul>
        <button
          className={buttonClasses}
          onClick={this.handleRemoveCompleted}
        >
          Clear completed
        </button>
      </footer>
    );
  }
});

export default TodoFooter;
