import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import { TodoRouter } from '../components';
import DevTools from './DevTools';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <TodoRouter />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
