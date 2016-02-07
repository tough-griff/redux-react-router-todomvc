import expect from 'expect.js';
import sinon from 'sinon';

import setup from '../helpers/componentSetup';

import TextInput from '../../js/components/TextInput';

describe('<TextInput />', function () {
  const className = 'className';
  const onSave = sinon.spy();
  const placeholder = 'placeholder';
  const value = 'value';
  const { output, renderer } = setup(TextInput, { className, onSave, placeholder, value });

  beforeEach(function () {
    onSave.reset();
  });

  it('renders correctly', function () {
    expect(output.type).to.equal('input');
    expect(output.props.autoFocus).to.be(true);
    expect(output.props.className).to.equal(className);
    expect(output.props.onBlur).to.be.a('function');
    expect(output.props.onChange).to.be.a('function');
    expect(output.props.onKeyDown).to.be.a('function');
    expect(output.props.placeholder).to.equal(placeholder);
    expect(output.props.type).to.equal('text');
    expect(output.props.value).to.equal(value);
  });

  describe('#onBlur()', function () {
    beforeEach(function () {
      output.props.onBlur();
    });

    it('calls onSave correctly', function () {
      expect(onSave.called).to.be(true);
    });

    it('sets the state correctly', function () {
      const newOutput = renderer.getRenderOutput();
      expect(newOutput.props.value).to.equal('');
    });
  });

  describe('#onChange()', function () {
    it('sets state correctly', function () {
      output.props.onChange({ target: { value: 'newValue' } });
      const newOutput = renderer.getRenderOutput();
      expect(newOutput.props.value).to.equal('newValue');
    });
  });

  describe('#onKeyDown()', function () {
    it('calls onSave correctly', function () {
      output.props.onKeyDown({ keyCode: 10 });
      expect(onSave.called).to.be(false);
      output.props.onKeyDown({ keyCode: 13 });
      expect(onSave.called).to.be(true);
    });
  });
});
