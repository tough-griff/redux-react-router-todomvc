import 'isomorphic-fetch';

import { Actions } from '../constants';

const SERVER_URL = 'http://localhost:9090';

const TodoActions = {
  addTodo(label) {
    return dispatch => {
      fetch(`${SERVER_URL}/todos`, {
        method: 'POST',
        headers: {
          'Accepts': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isComplete: false,
          label
        })
      })
      .then(res => res.json())
      .then(todo => dispatch({
        type: Actions.ADD_TODO,
        payload: { todo }
      }))
      .catch(() => dispatch({
        type: Actions.ADD_TODO,
        payload: new Error(),
        error: true
      }));
    };
  },

  // FIXME: this is just a stub--does nothing on the server.
  clearCompleteTodos() {
    return {
      type: Actions.CLEAR_COMPLETE_TODOS
    };
  },

  deleteTodo(id) {
    return dispatch => {
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'DELETE'
      })
      .then(() => dispatch({
        type: Actions.DELETE_TODO,
        payload: { id }
      }))
      .catch(() => dispatch({
        type: Actions.DELETE_TODO,
        payload: new Error(),
        error: true
      }));
    };
  },

  editTodo(id, label) {
    return dispatch => {
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ label })
      })
      .then(res => res.json())
      .then(todo => dispatch({
        type: Actions.EDIT_TODO,
        payload: {
          id: todo.id,
          label: todo.label
        }
      }))
      .catch(() => dispatch({
        type: Actions.EDIT_TODO,
        payload: new Error(),
        error: true
      }));
    };
  },

  fetchAllTodos() {
    return dispatch => {
      fetch(`${SERVER_URL}/todos`, {
        method: 'GET'
      })
      .then(res => res.json())
      .then(todos => dispatch({
        type: Actions.FETCH_ALL_TODOS,
        payload: { todos }
      }))
      .catch(() => dispatch({
        type: Actions.FETCH_ALL_TODOS,
        payload: new Error(),
        error: true
      }));
    };
  },

  markTodo(id, isComplete) {
    return dispatch => {
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isComplete })
      })
      .then(res => res.json())
      .then(todo => dispatch({
        type: Actions.MARK_TODO,
        payload: {
          id: todo.id,
          isComplete: todo.isComplete
        }
      }))
      .catch(() => dispatch({
        type: Actions.MARK_TODO,
        payload: new Error(),
        error: true
      }));
    };
  },

  // FIXME: this is just a stub--does nothing on the server.
  markAllTodos(isComplete) {
    return {
      type: Actions.MARK_ALL_TODOS,
      payload: { isComplete }
    };
  },

  // FIXME: this is just a stub--does nothing on the server.
  moveTodo(at, to) {
    return {
      type: Actions.MOVE_TODO,
      payload: { at, to }
    };
  }
};

export default TodoActions;
