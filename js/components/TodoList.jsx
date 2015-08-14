import { List, Seq } from 'immutable';
import React, { Component, PropTypes } from 'react';

import { TodoFooter, TodoItem } from '.';

const FILTERS = {
  all: () => true,
  active: todo => !todo.isComplete,
  completed: todo => todo.isComplete
};

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 */
export default class TodoList extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.instanceOf(List).isRequired
  }

  onToggle = (e) => {
    // NOTE: `e.target` broken in 0.14.0-beta1, using `e.nativeEvent.target`
    this.props.actions.markAllTodos(e.nativeEvent.target.checked);
  }

  renderFooter(completeCount) {
    // FIXME
    // const { actions, todos: { size }} = this.props;
    const { actions, todos } = this.props;
    const { clearCompleteTodos, moveTodo } = actions;
    const { size } = todos;

    if (!size) return null;

    const incompleteCount = size - completeCount;
    const maxIndex = Seq(todos).reduce((max, todo) => {
      const { index } = todo;
      return (index > max) ? index : max;
    }, 0);

    return (
      <TodoFooter
        clearCompleteTodos={clearCompleteTodos}
        completeCount={completeCount}
        incompleteCount={incompleteCount}
        maxIndex={maxIndex}
        moveTodo={moveTodo}
      />
    );
  }

  renderListItems() {
    // FIXME?
    const { filter, todos } = this.props;

    return Seq(todos).filter(FILTERS[filter])
      .sortBy(todo => todo.index)
      .map(this.renderTodo)
      .toArray();
  }

  renderTodo = (todo) => {
    const { deleteTodo, editTodo, markTodo, moveTodo } = this.props.actions;
    const todoObj = todo.toJS();

    return (
      <TodoItem
        key={`todo-${todo.id}`}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
        markTodo={markTodo}
        moveTodo={moveTodo}
        {...todoObj}
      />
    );
  }

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
    const completeCount = Seq(todos).reduce((count, todo) => {
      return (todo.isComplete) ? count + 1 : count;
    }, 0);

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
