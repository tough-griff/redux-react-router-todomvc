import 'isomorphic-fetch';
import checkStatus from 'fetch-check-http-status';

import { Actions } from '../constants';

const SERVER_URL = '/api';

/**
 * Parse the response's JSON.
 */
function parse(response) {
  return response.json();
}

export default {
  addTodo(label) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isComplete: false,
          label,
        }),
      }).then(checkStatus)
        .then(parse)
        .then(todo => dispatch({
          type: Actions.ADD_TODO,
          payload: { todo },
        }))
        .catch(err => dispatch({
          type: Actions.ADD_TODO,
          payload: err,
          error: true,
        }));
  },

  // FIXME: this is just a stub--does nothing on the server.
  clearCompleteTodos() {
    return {
      type: Actions.CLEAR_COMPLETE_TODOS,
    };
  },

  deleteTodo(id) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'DELETE',
      }).then(checkStatus)
        .then(() => dispatch({
          type: Actions.DELETE_TODO,
          payload: { id },
        }))
        .catch(err => dispatch({
          type: Actions.DELETE_TODO,
          payload: err,
          error: true,
        }));
  },

  editTodo(id, label) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label }),
      }).then(checkStatus)
        .then(parse)
        .then(todo => dispatch({
          type: Actions.EDIT_TODO,
          payload: {
            id: todo.id,
            label: todo.label,
          },
        }))
        .catch(err => dispatch({
          type: Actions.EDIT_TODO,
          payload: err,
          error: true,
        }));
  },

  fetchAllTodos() {
    return dispatch =>
      fetch(`${SERVER_URL}/todos`, {
        method: 'GET',
      }).then(checkStatus)
        .then(parse)
        .then(todos => dispatch({
          type: Actions.FETCH_ALL_TODOS,
          payload: { todos },
        }))
        .catch(err => dispatch({
          type: Actions.FETCH_ALL_TODOS,
          payload: err,
          error: true,
        }));
  },

  markTodo(id, isComplete) {
    return dispatch =>
      fetch(`${SERVER_URL}/todos/${id}`, {
        method: 'PATCH',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isComplete }),
      }).then(checkStatus)
        .then(parse)
        .then(todo => dispatch({
          type: Actions.MARK_TODO,
          payload: {
            id: todo.id,
            isComplete: todo.isComplete,
          },
        }))
        .catch(err => dispatch({
          type: Actions.MARK_TODO,
          payload: err,
          error: true,
        }));
  },

  // FIXME: this is just a stub--does nothing on the server.
  markAllTodos(isComplete) {
    return {
      type: Actions.MARK_ALL_TODOS,
      payload: { isComplete },
    };
  },

  // FIXME: this is just a stub--does nothing on the server.
  moveTodo(at, to) {
    return {
      type: Actions.MOVE_TODO,
      payload: { at, to },
    };
  },
};
