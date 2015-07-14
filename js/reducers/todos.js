import camelCase from 'camel-case';

const ACTION_HANDLERS = {
  addTodo(state, action) {
    return {
      todoList: [...state.todoList, action.todo]
    };
  },

  clearCompleteTodos(state) {
    return {
      todoList: state.todoList.filter(todo => !todo.isComplete)
    };
  },

  deleteTodo(state, action) {
    return {
      todoList: state.todoList.filter(todo => todo.id !== action.id)
    };
  },

  editTodo(state, action) {
    return {
      todoList: state.todoList.map(todo => (
        todo.id === action.todo.id
          ? action.todo : todo
      ))
    };
  },

  fetchAllTodos(state, action) {
    return {
      todoList: action.todos
    };
  },

  markAllTodos(state, action) {
    return {
      todoList: state.todoList.map(todo => ({
        ...todo,
        isComplete: action.checked
      }))
    };
  },

  markTodo(state, action) {
    return {
      todoList: state.todoList.map(todo => (
        todo.id === action.todo.id
          ? action.todo : todo
      ))
    };
  }
};

const initialState = {
  todoList: []
};

export default function todos(state = initialState, action) {
  const handler = ACTION_HANDLERS[camelCase(action.type)];

  if (!handler) return state;

  return {
    ...state,
    ...handler(state, action)
  };
}
