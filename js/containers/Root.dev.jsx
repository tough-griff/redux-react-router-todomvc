import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { browserHistory, Router } from 'react-router';

import DevTools from './DevTools';
import routes from '../routes';

export default class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <Router history={browserHistory} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}
