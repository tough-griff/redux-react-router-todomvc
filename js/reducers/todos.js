import camelCase from 'camel-case';

const ACTIONS_MAP = {
  addTodo(state, payload) {
    return {
      ...state,
      todoList: [...state.todoList, payload.todo]
    };
  },

  clearCompleteTodos(state) {
    return {
      ...state,
      todoList: state.todoList.filter(todo => !todo.isComplete)
    };
  },

  deleteTodo(state, payload) {
    return {
      ...state,
      todoList: state.todoList.filter(todo => todo.id !== payload.id)
    };
  },

  editTodo(state, payload) {
    return {
      ...state,
      todoList: state.todoList.map(todo => (
        (todo.id === payload.todo.id) ? payload.todo : todo
      ))
    };
  },

  fetchAllTodos(state, payload) {
    return {
      ...state,
      todoList: payload.todos
    };
  },

  markAllTodos(state, payload) {
    return {
      ...state,
      todoList: state.todoList.map(todo => ({
        ...todo,
        isComplete: payload.isComplete
      }))
    };
  },

  markTodo(state, payload) {
    return {
      ...state,
      todoList: state.todoList.map(todo => (
        (todo.id === payload.todo.id) ? payload.todo : todo
      ))
    };
  }
};

const initialState = {
  todoList: []
};

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
