import $ from 'jquery';
import React from 'react';

import TodoRoot from './components/TodoRoot';

$(document).ready(() => {
  React.render(<TodoRoot />, $('.todoapp')[0]);
});
