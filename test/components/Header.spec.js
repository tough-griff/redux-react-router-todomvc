/* eslint-env mocha */
import expect from 'expect.js';
import sinon from 'sinon';

import setup from '../helpers/componentSetup';

import { Header } from '../../js/components';

describe('Header', () => {
  it('should render correctly', () => {
    const testProps = { addTodo: sinon.spy() };
    const { output } = setup(Header, testProps);

    expect(output.type).to.equal('header');
    expect(output.props.className).to.equal('header');
  });

  it('should call addTodo on save correctly', () => {
    const testProps = { addTodo: sinon.spy() };
    const { output, props } = setup(Header, testProps);
    const textInput = output.props.children[1];

    textInput.props.onSave('');
    expect(props.addTodo.called).to.be(false);
    textInput.props.onSave('Example');
    expect(props.addTodo.called).to.be(true);
  });
});
