import $ from 'jquery';
import React from 'react';

import App from './containers/App';

$(document).ready(() => {
  React.render(<App />, $('.todoapp')[0]);
});
