import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';

import { TodoRouter } from '../components';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <TodoRouter />
      </Provider>
    );
  }
}
