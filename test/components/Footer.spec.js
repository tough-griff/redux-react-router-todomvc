import expect from 'expect.js';
import sinon from 'sinon';

import setup from '../helpers/componentSetup';

import Footer from '../../js/components/Footer';

describe('<Footer />', function () {
  const clearCompleteTodos = sinon.spy();
  const props = {
    canDrop: false,
    clearCompleteTodos,
    connectDropTarget: (el) => el,
    completeCount: 0,
    filter: 'all',
    incompleteCount: 0,
    isOver: false,
    maxIndex: 0,
    moveTodo: sinon.stub(),
  };

  const { output } = setup(Footer.DecoratedComponent, props);
  const list = output.props.children[1];

  it('renders correctly', function () {
    expect(output.type).to.equal('footer');
    expect(output.props.className).to.equal('footer');

    expect(list.type).to.equal('ul');
    expect(list.props.className).to.equal('filters');
    expect(list.props.children.length).to.equal(3);
  });

  context('with a zero complete count', function () {
    const button = output.props.children[2];

    it('does not render the clear complete button', function () {
      expect(button).to.be(null);
    });
  });

  context('with a nonzero complete count', function () {
    const { output: completeOutput } = setup(Footer.DecoratedComponent, {
      ...props, completeCount: 2,
    });
    const button = completeOutput.props.children[2];

    it('renders the clear complete button', function () {
      expect(button.type).to.equal('button');
      expect(button.props.className).to.equal('clear-completed');
      expect(button.props.onClick).to.be.a('function');
      expect(button.props.children).to.equal('Clear complete');
    });

    describe('#onRemoveCompleted()', function () {
      it('calls clearCompleteTodos', function () {
        expect(clearCompleteTodos.called).to.be(false);
        button.props.onClick();
        expect(clearCompleteTodos.called).to.be(true);
      });
    });
  });

  context('with a zero incomplete count', function () {
    const count = output.props.children[0];

    it('renders the text "No"', function () {
      const countText = count.props.children[0].props.children;

      expect(countText).to.equal('No');
    });
  });

  context('with a nonzero incomplete count', function () {
    const incompleteCount = 2;
    const { output: incompleteOutput } = setup(Footer.DecoratedComponent, {
      ...props, incompleteCount,
    });
    const count = incompleteOutput.props.children[0];

    it('renders the incomplete count', function () {
      const countText = count.props.children[0].props.children;

      expect(countText).to.equal(incompleteCount);
    });
  });
});
