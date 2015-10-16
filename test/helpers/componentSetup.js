import React from 'react';
import TestUtils from 'react-addons-test-utils';

export default function componentSetup(component, props) {
  const renderer = TestUtils.createRenderer();
  renderer.render(React.createElement(component, props));
  const output = renderer.getRenderOutput();

  return { props, output, renderer };
}
