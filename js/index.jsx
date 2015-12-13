import 'babel-core/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { TodoRouter } from './components';
import configureStore from './configureStore';

const store = configureStore();

let component;

if (__DEVELOPMENT__ && __DEVTOOLS__) {
  const { DebugPanel, DevTools, LogMonitor } = require('redux-devtools/lib/react');
  component = (
    <div>
      <Provider store={store}>
        <TodoRouter />
      </Provider>
      <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor} />
      </DebugPanel>
    </div>
  );
} else {
  component = (
    <Provider store={store}>
      <TodoRouter />
    </Provider>
  );
}
ReactDOM.render(component, document.getElementById('app'));
