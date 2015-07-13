import 'whatwg-fetch';

import * as types from '../constants/ActionTypes';

const SERVER_URL = 'http://localhost:9090';

export function addTodo(label) {
  return dispatch => {
    fetch(`${SERVER_URL}/todos`, {
      method: 'POST',
      headers: {
        'Accepts': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        isComplete: false,
        label: label
      })
    })
    .then(res => res.json())
    .then(todo => dispatch({
      type: types.ADD_TODO,
      todo
    }));
  };
}

// FIXME: this is just a stub--does nothing on the server.
export function clearCompleteTodos() {
  return {
    type: types.CLEAR_COMPLETE_TODOS
  };
}

export function deleteTodo(id) {
  return dispatch => {
    fetch(`${SERVER_URL}/todos/${id}`, {
      method: 'DELETE'
    })
    .then(() => dispatch({
      type: types.DELETE_TODO,
      id
    }));
  };
}

export function editTodo(id, label) {
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
      type: types.EDIT_TODO,
      todo
    }));
  };
}

export function fetchAllTodos() {
  return dispatch => {
    fetch(`${SERVER_URL}/todos`, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(todos => dispatch({
      type: types.FETCH_ALL_TODOS,
      todos
    }));
  };
}

export function markTodo(id, isComplete) {
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
      type: types.EDIT_TODO,
      todo
    }));
  };
}

// FIXME this is just a stub--does nothing on the server.
export function markAllTodos(checked) {
  return {
    type: types.MARK_ALL_TODOS,
    checked
  };
}
