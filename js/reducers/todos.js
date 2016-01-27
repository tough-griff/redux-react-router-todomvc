import camelCase from 'camel-case';
import { List, Record, Seq } from 'immutable';

const Todo = new Record({
  id: 0,
  index: 0,
  isComplete: false,
  label: 'todo',
});

const ACTIONS_MAP = {
  addTodo(state, { todo }) {
    return state.push(new Todo({ index: todo.id, ...todo }));
  },

  clearCompleteTodos(state) {
    return state.filter(todo => !todo.get('isComplete'));
  },

  deleteTodo(state, { id }) {
    return state.filter(todo => todo.get('id') !== id);
  },

  editTodo(state, { id, label }) {
    return state.map(todo =>
      (todo.get('id') === id)
        ? todo.set('label', label)
        : todo
    );
  },

  fetchAllTodos(state, { todos: allTodos }) {
    return new Seq(allTodos)
      .map(todo => new Todo({ index: todo.id, ...todo }))
      .toList();
  },

  markAllTodos(state, { isComplete }) {
    return state.map(todo => todo.set('isComplete', isComplete));
  },

  markTodo(state, { id, isComplete }) {
    return state.map(todo =>
      (todo.get('id') === id)
        ? todo.set('isComplete', isComplete)
        : todo
    );
  },

  moveTodo(state, { at, to }) {
    return state.map(todo => {
      let newTodo = todo;

      if (todo.get('index') === at) {
        newTodo = todo.set('index', to);
      } else if (todo.get('index') >= to) {
        newTodo = todo.update('index', index => index + 1);
      }

      return newTodo;
    });
  },
};

const initialState = new List();

/**
 * If the action type corresponds to a handler in ACTIONS_MAP, return a
 * reduction of the state. If no corresponding action is found, simply pass
 * the state through.
 */
export default function todos(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}
