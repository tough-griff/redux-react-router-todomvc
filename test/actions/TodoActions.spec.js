/* eslint-env mocha */
import 'isomorphic-fetch';
import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import mockStore from '../helpers/mockStore';

import TodoActions from '../../js/actions/TodoActions';

describe('TodoActions', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  it('exposes an object', () => {
    expect(TodoActions).to.be.an('object');
  });

  context('addTodo', () => {
    const label = 'fake todo';
    const subject = TodoActions.addTodo('label');
    const action = {
      type: 'ADD_TODO',
      payload: { todo: { label } },
    };

    before(() => {
      fetchMock.mock('/api/todos', 'POST', { label });
    });

    after(() => {
      fetchMock.restore();
    });

    it('returns a thunk', () => {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', () => {
      subject();
      expect(fetchMock.called('/api/todos')).to.be(true);
    });

    it('dispatches the correct action', (done) => {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  context('clearCompleteTodos', () => {
    const subject = TodoActions.clearCompleteTodos();
    const action = {
      type: 'CLEAR_COMPLETE_TODOS',
    };

    it('creates the correct action', () => {
      expect(subject).to.eql(action);
    });
  });

  context('deleteTodo', () => {
    const id = 5;
    const subject = TodoActions.deleteTodo(id);
    const action = {
      type: 'DELETE_TODO',
      payload: { id },
    };

    before(() => {
      fetchMock.mock(`/api/todos/${id}`, 'DELETE');
    });

    after(() => {
      fetchMock.restore();
    });

    it('returns a thunk', () => {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', () => {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', (done) => {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  context('editTodo', () => {
    const id = 5;
    const label = 'fake todo';
    const subject = TodoActions.editTodo(id, label);
    const action = {
      type: 'EDIT_TODO',
      payload: { id, label },
    };

    before(() => {
      fetchMock.mock(`/api/todos/${id}`, 'PATCH', { id, label });
    });

    after(() => {
      fetchMock.restore();
    });

    it('returns a thunk', () => {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', () => {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', (done) => {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  context('fetchAllTodos', () => {
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];
    const subject = TodoActions.fetchAllTodos();
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: { todos },
    };

    before(() => {
      fetchMock.mock('/api/todos', 'GET', todos);
    });

    after(() => {
      fetchMock.restore();
    });

    it('returns a thunk', () => {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', () => {
      subject();
      expect(fetchMock.called('/api/todos')).to.be(true);
    });

    it('dispatches the correct action', (done) => {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  context('markTodo', () => {
    const id = 5;
    const isComplete = true;
    const subject = TodoActions.markTodo(id, isComplete);
    const action = {
      type: 'MARK_TODO',
      payload: { id, isComplete },
    };

    before(() => {
      fetchMock.mock(`/api/todos/${id}`, 'PATCH', { id, isComplete });
    });

    after(() => {
      fetchMock.restore();
    });

    it('returns a thunk', () => {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', () => {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', (done) => {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  context('markAllTodos', () => {
    const isComplete = true;
    const subject = TodoActions.markAllTodos(isComplete);
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: { isComplete },
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
      type: 'MOVE_TODO',
      payload: { at, to },
    };

    it('creates the correct action', () => {
      expect(subject).to.eql(action);
    });
  });
});
