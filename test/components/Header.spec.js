import expect from 'expect.js';
import sinon from 'sinon';

import setup from '../helpers/componentSetup';

import Header from '../../js/components/Header';
import { TextInput } from '../../js/components';

describe('Header', function () {
  const addTodo = sinon.spy();
  const { output } = setup(Header, { addTodo });

  it('should render correctly', function () {
    const [h1, textInput] = output.props.children;

    expect(output.type).to.equal('header');
    expect(output.props.className).to.equal('header');

    expect(h1.type).to.equal('h1');
    expect(h1.props.children).to.equal('Todos');

    expect(textInput.type).to.equal(TextInput);
    expect(textInput.props.className).to.equal('new-todo');
    expect(textInput.props.onSave).to.be.a('function');
    expect(textInput.props.placeholder).to.equal('What needs to be done?');
  });

  it('should call addTodo on save correctly', function () {
    const textInput = output.props.children[1];

    textInput.props.onSave('');
    expect(addTodo.called).to.be(false);
    textInput.props.onSave('Example');
    expect(addTodo.called).to.be(true);
  });
});
