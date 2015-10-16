// import fetchMock from 'fetch-mock';
import expect from 'expect.js';

import { Actions } from '../../js/constants';
import { TodoActions } from '../../js/actions';

// TODO: fixme
// fetchMock.registerRoute([{
  // name: 'addTodo',
  // matcher: 'http://localhost:9090/todos',
  // response: {
    // body: {
      // todo: 'example'
    // }
  // }
// }]);

describe('TodoActions', () => {
  it('exposes an object', () => {
    expect(TodoActions).to.be.an('object');
  });

  context('addTodo', () => {
    it('returns a thunk', () => {
      expect(TodoActions.addTodo()).to.be.a('function');
    });

    // TODO: fixme, and stub out a dispatch method.
    // it('should post to the addTodo path', () => {
      // fetchMock.mock({ greed: 'bad' });
      // TodoActions.addTodo('label')();
      // expect(fetchMock.called('addTodo')).to.be(true);
      // fetchMock.restore();
    // });
  });

  context('clearCompleteTodos', () => {
    const subject = TodoActions.clearCompleteTodos();
    const action = {
      type: Actions.CLEAR_COMPLETE_TODOS
    };

    it('creates the correct action', () => {
      expect(subject).to.eql(action);
    });
  });

  context('deleteTodo', () => {
    it('returns a thunk', () => {
      expect(TodoActions.deleteTodo()).to.be.a('function');
    });
  });

  context('editTodo', () => {
    it('returns a thunk', () => {
      expect(TodoActions.editTodo()).to.be.a('function');
    });
  });

  context('fetchAllTodos', () => {
    it('returns a thunk', () => {
      expect(TodoActions.fetchAllTodos()).to.be.a('function');
    });
  });

  context('markTodo', () => {
    it('returns a thunk', () => {
      expect(TodoActions.markTodo()).to.be.a('function');
    });
  });

  context('markAllTodos', () => {
    const isComplete = true;
    const subject = TodoActions.markAllTodos(isComplete);
    const action = {
      type: Actions.MARK_ALL_TODOS,
      payload: { isComplete }
    };

    it('creates the correct action', () => {
      expect(subject).to.eql(action);
    });
  });

  context('moveTodo', () => {
    const at = 5;
    const to = 8;
    const subject = TodoActions.moveTodo(at, to);
    const action = {
      type: Actions.MOVE_TODO,
      payload: { at, to }
    };

    it('creates the correct action', () => {
      expect(subject).to.eql(action);
    });
  });
});
