import camelCase from 'camel-case';

const ACTION_HANDLERS = {
  addTodo(state, payload) {
    return {
      todoList: [...state.todoList, payload.todo]
    };
  },

  clearCompleteTodos(state) {
    return {
      todoList: state.todoList.filter(todo => !todo.isComplete)
    };
  },

  deleteTodo(state, payload) {
    return {
      todoList: state.todoList.filter(todo => todo.id !== payload.id)
    };
  },

  editTodo(state, payload) {
    return {
      todoList: state.todoList.map(todo => (
        todo.id === payload.todo.id
          ? payload.todo : todo
      ))
    };
  },

  fetchAllTodos(state, payload) {
    return {
      todoList: payload.todos
    };
  },

  markAllTodos(state, payload) {
    return {
      todoList: state.todoList.map(todo => ({
        ...todo,
        isComplete: payload.checked
      }))
    };
  },

  markTodo(state, payload) {
    return {
      todoList: state.todoList.map(todo => (
        todo.id === payload.todo.id
          ? payload.todo : todo
      ))
    };
  }
};

const initialState = {
  todoList: []
};

export default function todos(state = initialState, action) {
  const { type, payload } = action;
  const handler = ACTION_HANDLERS[camelCase(type)];

  if (!handler) return state;

  return {
    ...state,
    ...handler(state, payload)
  };
}
