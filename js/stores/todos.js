import * as types from '../constants/ActionTypes';

export default function todos(state = [], action) {
  switch (action.type) {
    case types.ADD_TODO:
      return [...state, action.todo];

    case types.CLEAR_COMPLETE_TODOS:
      return state.filter(todo => !todo.isComplete);

    case types.DELETE_TODO:
      return state.filter(todo => todo.id !== action.id);

    case types.EDIT_TODO:
    case types.MARK_TODO:
      return state.map(todo => (
        todo.id === action.todo.id
          ? action.todo
          : todo
      ));

    case types.FETCH_ALL_TODOS:
      return action.todos;

    case types.MARK_ALL_TODOS:
      return state.map(todo => ({
        ...todo,
        isComplete: action.checked
      }));

    default:
      return state;
  }
}
