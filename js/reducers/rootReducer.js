import { combineReducers } from 'redux';
import { routerStateReducer } from 'redux-router';

import { todos } from '.';

const rootReducer = combineReducers({
  router: routerStateReducer,
  todos,
});

export default rootReducer;
