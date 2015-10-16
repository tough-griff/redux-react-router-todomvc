import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { TodoRouter } from './components';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <TodoRouter />
  </Provider>,
  document.getElementById('app')
);
