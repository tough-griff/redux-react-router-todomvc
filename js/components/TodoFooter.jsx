import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * Manages routing using ReactRouter.Link, as well as renders a
 * 'Clear complete' button and complete tasks counter.
 */
export default class TodoFooter extends Component {
  static propTypes = {
    clearCompleteTodos: PropTypes.func.isRequired,
    completeCount: PropTypes.number.isRequired,
    incompleteCount: PropTypes.number.isRequired
  }

  handleRemoveCompleted() {
    this.props.clearCompleteTodos();
  }

  renderClearButton() {
    if (!this.props.completeCount) return null;

    return (
      <button
        className="clear-completed"
        onClick={::this.handleRemoveCompleted}
      >
        Clear complete
      </button>
    );
  }

  renderTodoCount() {
    const { incompleteCount } = this.props;
    const incompleteWord = incompleteCount || 'No';
    const itemWord = incompleteCount === 1 ? 'task' : 'tasks';

    return (
      <span className="todo-count">
        <strong>{incompleteWord}</strong> {itemWord} remaining
      </span>
    );
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
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
        {this.renderClearButton()}
      </footer>
    );
  }
}
