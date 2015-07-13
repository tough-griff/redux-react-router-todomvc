import _ from 'lodash';
import React, { PropTypes } from 'react';

// import TodoActions from '../actions/TodoActions';
import TodoItem from './TodoItem';
import todoShape from './propShapes/todoShape';

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 */
const TodoList = React.createClass({
  propTypes: {
    todos: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired
  },

  // TODO
  handleToggle(e) {
    // TodoActions.toggleAll(e.target.checked);
    console.log(e.target.checked);
  },

  renderListItems() {
    const { todos } = this.props;

    return _(todos).map((todo) => {
      return (
        <TodoItem key={todo.id} todo={todo} />
      );
    }).value();
  },

  render() {
    return (
      <section className="main">
        <input
          className="toggle-all"
          type="checkbox"
          onChange={this.handleToggle}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul className="todo-list">
          {this.renderListItems()}
        </ul>
      </section>
    );
  }
});

export default TodoList;
