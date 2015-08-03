import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd/modules/backends/HTML5';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TodoHeader, TodoList } from '.';
import { TodoActions } from '../actions';

/**
 * Top-level application component. Connects to the Redux `Provider` stores,
 * passing their state through as props.
 * @see App
 * @see todos
 */
@DragDropContext(HTML5Backend)
@connect(state => ({
  todos: state.todos.get('todoList')
}))
export default class TodoApp extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    todos: PropTypes.instanceOf(List).isRequired,
    location: PropTypes.object.isRequired
  }

  render() {
    const { dispatch, location, todos } = this.props;
    const actions = bindActionCreators(TodoActions, dispatch);
    const filter = location.pathname.replace('/todos/', '');

    return (
      <div>
        <TodoHeader
          addTodo={actions.addTodo}
        />
        <TodoList
          actions={actions}
          filter={filter}
          todos={todos}
        />
      </div>
    );
  }
}
