import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TodoHeader, TodoList } from '.';
import { TodoActions } from '../actions';

function mapStateToProps(state) {
  return { todos: state.todos.get('todoList') };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(TodoActions, dispatch) };
}

/**
 * Top-level application component. Connects to the Redux `Provider` stores,
 * passing their state through as props.
 * @see App
 * @see todos
 */
@DragDropContext(HTML5Backend)
@connect(mapStateToProps, mapDispatchToProps)
export default class TodoApp extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    todos: PropTypes.instanceOf(List).isRequired
  }

  componentWillMount() {
    this.props.actions.fetchAllTodos();
  }

  render() {
    const { actions, location, todos } = this.props;
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
