// import fetchMock from 'fetch-mock';
import expect from 'expect.js';

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
    it('returns an object', () => {
      expect(TodoActions.clearCompleteTodos()).to.be.an('object');
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
    it('returns an object', () => {
      expect(TodoActions.markAllTodos()).to.be.an('object');
    });
  });

  context('moveTodo', () => {
    it('returns an object', () => {
      expect(TodoActions.moveTodo()).to.be.an('object');
    });
  });
});
