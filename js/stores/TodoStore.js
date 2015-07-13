import _ from 'lodash';
// import { List, Map} from 'immutable';
import * as types from '../constants/ActionTypes';

// const initialState = Map({
  // todos: List([
    // Map({
      // 'id': 1,
      // 'isComplete': true,
      // 'label': 'Be awesome'
    // }),
    // Map({
      // 'id': 2,
      // 'isComplete': false,
      // 'label': 'Rule the web'
    // })
  // ])
// });

export default function TodoStore(state, action) {
  const { todos } = state;

  switch (action.type) {
    case types.ADD_TODO:
      return [...todos, action.todo];

    case types.CLEAR_MARKED_TODOS:
      return _.reject(todos, { isComplete: true });

    case types.DELETE_TODO:
      return _.reject(todos, { id: action.id });

    case types.EDIT_TODO:
    case types.MARK_TODO:
      return _.map(todos, todo =>
        todo.id === action.todo.id
          ? action.todo
          : todo
      );

    case types.FETCH_ALL_TODOS:
      return action.todos;

    case types.MARK_ALL_TODOS:
      return _.map(todos, todo => ({
        ...todo,
        isComplete: action.checked
      }));

    default:
      return state;
  }
}
