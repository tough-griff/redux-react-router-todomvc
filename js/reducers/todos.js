import { List, Map, Record } from 'immutable';
import camelCase from 'camel-case';

const Todo = Record({
  id: 0,
  index: 0,
  isComplete: false,
  label: 'new todo',
});

const ACTIONS_MAP = {
  addTodo(state, { todo }) {
    return state.update('todoList', todoList => {
      return todoList.push(Todo({ index: todo.id, ...todo }));
    });
  },

  clearCompleteTodos(state) {
    return state.update('todoList', todoList => {
      return todoList.filter(todo => !todo.get('isComplete'));
    });
  },

  deleteTodo(state, { id }) {
    return state.update('todoList', todoList => {
      return todoList.filter(todo => todo.get('id') !== id);
    });
  },

  editTodo(state, { id, label }) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => {
        return (todo.get('id') === id)
          ? todo.set('label', label)
          : todo;
      });
    });
  },

  fetchAllTodos(state, { todos: allTodos }) {
    const todoList = List(allTodos).map(todo => Todo({ index: todo.id, ...todo }));

    return state.set('todoList', todoList);
  },

  markAllTodos(state, { isComplete }) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => todo.set('isComplete', isComplete));
    });
  },

  markTodo(state, { id, isComplete }) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => {
        return (todo.get('id') === id)
          ? todo.set('isComplete', isComplete)
          : todo;
      });
    });
  },

  moveTodo(state, { at, to }) {
    return state.update('todoList', todoList => {
      return todoList.map(todo => {
        let newTodo = todo;

        if (todo.get('index') === at) {
          newTodo = todo.set('index', to);
        } else if (todo.get('index') >= to) {
          newTodo = todo.update('index', index => index + 1);
        }

        return newTodo;
      });
    });
  },
};

const initialState = Map({
  todoList: List(),
});

/**
 * If the action type corresponds to a handler in ACTIONS_MAP, return a
 * reduction of the state. If no corresponding action is found, simply pass
 * the state through.
 */
export default function todos(state = initialState, { type, payload }) {
  const reducer = ACTIONS_MAP[camelCase(type)];

  return (reducer) ? reducer(state, payload) : state;
}
