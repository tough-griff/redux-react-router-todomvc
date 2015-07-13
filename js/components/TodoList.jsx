import React, { Component, PropTypes } from 'react';

import TodoFooter from './TodoFooter';
import TodoItem from './TodoItem';
import todoShape from './propShapes/todoShape';

/**
 * Displays the list of todos, as well as the toggle all checkbox.
 */
export default class TodoList extends Component {
  static propTypes = {
    actions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    filter: PropTypes.oneOf(['all', 'active', 'completed']).isRequired,
    todos: PropTypes.arrayOf(PropTypes.shape(todoShape)).isRequired
  }

  componentDidMount() {
    this.props.actions.fetchAllTodos();
  }

  handleToggle(e) {
    this.props.actions.markAllTodos(e.target.checked);
  }

  renderFooter(completeCount) {
    const { todos, actions } = this.props;

    if (!todos.length) return null;

    const incompleteCount = todos.length - completeCount;

    return (
      <TodoFooter
        clearCompleteTodos={actions.clearCompleteTodos}
        completeCount={completeCount}
        incompleteCount={incompleteCount}
      />
    );
  }

  renderListItems() {
    const { actions, filter, todos } = this.props;

    const FILTERS = {
      all: () => true,
      active: todo => !todo.isComplete,
      completed: todo => todo.isComplete
    };

    return todos.filter(FILTERS[filter]).map(todo => (
      <TodoItem
        key={todo.id}
        deleteTodo={actions.deleteTodo}
        editTodo={actions.editTodo}
        markTodo={actions.markTodo}
        todo={todo}
      />
    ));
  }

  renderToggle(completeCount) {
    return (
      <input
        className="toggle-all"
        type="checkbox"
        checked={completeCount === this.props.todos.length}
        onChange={::this.handleToggle}
      />
    );
  }

  render() {
    const { todos } = this.props;
    const completeCount = todos.reduce((count, todo) => (
      todo.isComplete ? count + 1 : count
    ), 0);

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
