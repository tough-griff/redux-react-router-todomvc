import 'isomorphic-fetch';
import expect from 'expect.js';
import fetchMock from 'fetch-mock';

import mockStore from '../helpers/mockStore';

import TodoActions from '../../js/actions/TodoActions';

describe('TodoActions', function () {
  afterEach(function () {
    fetchMock.reset();
  });

  it('exposes an object', function () {
    expect(TodoActions).to.be.an('object');
  });

  describe('.addTodo()', function () {
    const label = 'fake todo';
    const subject = TodoActions.addTodo(label);
    const action = {
      type: 'ADD_TODO',
      payload: { todo: { label } },
    };

    before(function () {
      fetchMock.mock('/api/todos', 'POST', { label });
    });

    after(function () {
      fetchMock.restore();
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos')).to.be(true);
    });

    it('dispatches the correct action', function (done) {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  describe('.clearCompleteTodos()', function () {
    const subject = TodoActions.clearCompleteTodos();
    const action = {
      type: 'CLEAR_COMPLETE_TODOS',
    };

    it('creates the correct action', function () {
      expect(subject).to.eql(action);
    });
  });

  describe('.deleteTodo()', function () {
    const id = 5;
    const subject = TodoActions.deleteTodo(id);
    const action = {
      type: 'DELETE_TODO',
      payload: { id },
    };

    before(function () {
      fetchMock.mock(`/api/todos/${id}`, 'DELETE', {});
    });

    after(function () {
      fetchMock.restore();
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', function (done) {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  describe('.editTodo()', function () {
    const id = 5;
    const label = 'fake todo';
    const subject = TodoActions.editTodo(id, label);
    const action = {
      type: 'EDIT_TODO',
      payload: { id, label },
    };

    before(function () {
      fetchMock.mock(`/api/todos/${id}`, 'PATCH', { id, label });
    });

    after(function () {
      fetchMock.restore();
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', function (done) {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  describe('.fetchAllTodos()', function () {
    const todos = [{ label: 'fake1' }, { label: 'fake2' }];
    const subject = TodoActions.fetchAllTodos();
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: { todos },
    };

    before(function () {
      fetchMock.mock('/api/todos', 'GET', todos);
    });

    after(function () {
      fetchMock.restore();
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called('/api/todos')).to.be(true);
    });

    it('dispatches the correct action', function (done) {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  describe('.markTodo()', function () {
    const id = 5;
    const isComplete = true;
    const subject = TodoActions.markTodo(id, isComplete);
    const action = {
      type: 'MARK_TODO',
      payload: { id, isComplete },
    };

    before(function () {
      fetchMock.mock(`/api/todos/${id}`, 'PATCH', { id, isComplete });
    });

    after(function () {
      fetchMock.restore();
    });

    it('returns a thunk', function () {
      expect(subject).to.be.a('function');
    });

    it('makes the correct web request', function () {
      subject();
      expect(fetchMock.called(`/api/todos/${id}`)).to.be(true);
    });

    it('dispatches the correct action', function (done) {
      mockStore({}, [action], done).dispatch(subject);
    });
  });

  describe('.markAllTodos()', function () {
    const isComplete = true;
    const subject = TodoActions.markAllTodos(isComplete);
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: { isComplete },
    };

    it('creates the correct action', function () {
      expect(subject).to.eql(action);
    });
  });

  describe('.moveTodo()', function () {
    const at = 5;
    const to = 8;
    const subject = TodoActions.moveTodo(at, to);
    const action = {
      type: 'MOVE_TODO',
      payload: { at, to },
    };

    it('creates the correct action', function () {
      expect(subject).to.eql(action);
    });
  });
});
