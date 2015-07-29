import { List, Map, Record } from 'immutable';
import camelCase from 'camel-case';

const Todo = Record({
  id: 0,
  isComplete: false,
  label: 'new todo'
});

const ACTIONS_MAP = {
  addTodo(state, payload) {
    const todo = Todo(payload.todo);
    return state.update('todoList', todoList => {
      return todoList.push(todo);
    });
  },

  clearCompleteTodos(state) {
    return state.update('todoList', todoList => {
      return todoList.filter(todo => !todo.get('isComplete'));
    });
  },

  deleteTodo(state, payload) {
    return state.update('todoList', todoList => {
      return todoList.filter(todo => todo.get('id') !== payload.id);
    });
  },

  editTodo(state, payload) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => {
        return (todo.get('id') === payload.id)
          ? todo.set('label', payload.label)
          : todo;
      });
    });
  },

  fetchAllTodos(state, payload) {
    const todoList = List(payload.todos).map(todo => Todo(todo));
    return state.set('todoList', todoList);
  },

  markAllTodos(state, payload) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => todo.set('isComplete', payload.isComplete));
    });
  },

  markTodo(state, payload) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => {
        return (todo.get('id') === payload.id)
          ? todo.set('isComplete', payload.isComplete)
          : todo;
      });
    });
  }
};

const initialState = Map({
  todoList: List()
});

export default function todos(state = initialState, action) {
  const { type, payload } = action;
  const reducer = ACTIONS_MAP[camelCase(type)];

  /**
   * If the action corresponds to a handler in ACTIONS_MAP, return a reduction
   * of the state. If no corresponding action is found, simply pass the state
   * through.
   */
  return (reducer) ? reducer(state, payload) : state;
}
