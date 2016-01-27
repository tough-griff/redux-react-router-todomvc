import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';

import { Footer, Todo } from '.';

const FILTERS = {
  all: () => true,
  active: todo => !todo.isComplete,
  completed: todo => todo.isComplete,
};

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 */
export default class TodoList extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.instanceOf(List).isRequired,
  };

  onToggle = (evt) => {
    this.props.actions.markAllTodos(evt.target.checked);
  };

  renderFooter(completeCount) {
    const { actions, filter, todos } = this.props;
    const { clearCompleteTodos, moveTodo } = actions;
    const { size } = todos;

    if (!size) return null;

    const incompleteCount = size - completeCount;
    const maxIndex = todos.reduce((max, { index }) =>
      (index > max) ? index : max
    , 0);

    return (
      <Footer
        clearCompleteTodos={clearCompleteTodos}
        completeCount={completeCount}
        filter={filter}
        incompleteCount={incompleteCount}
        maxIndex={maxIndex}
        moveTodo={moveTodo}
      />
    );
  }

  renderListItems() {
    const { filter, todos } = this.props;

    return todos.toSeq()
      .filter(FILTERS[filter])
      .sortBy(todo => todo.index)
      .map(this.renderTodo)
      .toArray();
  }

  renderTodo = (todo) => {
    const { deleteTodo, editTodo, markTodo, moveTodo } = this.props.actions;
    const todoObj = todo.toJS();

    return (
      <Todo
        key={`todo-${todo.id}`}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        markTodo={markTodo}
        moveTodo={moveTodo}
        {...todoObj}
      />
    );
  };

  renderToggle(completeCount) {
    return (
      <input
        checked={completeCount === this.props.todos.size}
        className="toggle-all"
        onChange={this.onToggle}
        type="checkbox"
      />
    );
  }

  render() {
    const { todos } = this.props;
    const completeCount = todos.reduce((count, { isComplete }) =>
      (isComplete) ? count + 1 : count
    , 0);

    return (
      <section className="main">
        {this.renderToggle(completeCount)}
        <ul className="todo-list">
          {this.renderListItems()}
        </ul>
        {this.renderFooter(completeCount)}
      </section>
    );
  }
}
