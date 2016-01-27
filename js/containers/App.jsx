import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { TodoActions } from '../actions';
import { Header, TodoList } from '../components';

function mapStateToProps(state) {
  return {
    todos: state.todos,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(TodoActions, dispatch),
  };
}

/**
 * Top-level application component. Connects to the Redux `Provider` stores,
 * passing their state through as props, as well as receives props from the
 * router.
 */
@DragDropContext(HTML5Backend)
@connect(mapStateToProps, mapDispatchToProps)
export default class App extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    todos: PropTypes.instanceOf(List).isRequired,
  };

  componentWillMount() {
    this.props.actions.fetchAllTodos();
  }

  render() {
    const { actions, location, todos } = this.props;
    const { addTodo, fetchAllTodos } = actions;
    const filter = location.pathname.replace('/', '');

    return (
      <div>
        <Header
          addTodo={addTodo}
          fetchAllTodos={fetchAllTodos}
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
