import expect from 'expect.js';
import { List, Record } from 'immutable';

import todos from '../../js/reducers/todos';

describe('todos()', function () {
  const Todo = new Record({
    id: 0,
    index: 0,
    isComplete: false,
    label: 'new todo',
  });

  const state = new List([
    new Todo({
      id: 1,
      index: 1,
      isComplete: true,
      label: 'Hello',
    }),
    new Todo({
      id: 2,
      index: 2,
      isComplete: false,
      label: 'World',
    }),
  ]);

  it('exposes a function', function () {
    expect(todos).to.be.a('function');
  });

  it('returns the initial state', function () {
    expect(todos(undefined, {})).to.eql(new List());
  });

  it('passes state through with no appropriate action reducer', function () {
    expect(todos(state, { type: 'NONSENSE' })).to.equal(state);
  });

  context('action.type = ADD_TODO', function () {
    const action = {
      type: 'ADD_TODO',
      payload: {
        todo: {
          id: 3,
          label: 'New',
          isComplete: false,
        },
      },
    };

    it('appends a new todo', function () {
      const subject = todos(state, action);
      expect(subject.size).to.equal(3);
      expect(subject.last().get('label')).to.equal('New');
    });
  });

  context('action.type = CLEAR_COMPLETE_TODOS', function () {
    const action = {
      type: 'CLEAR_COMPLETE_TODOS',
    };

    it('removes todos where isComplete = true', function () {
      const subject = todos(state, action);
      expect(subject.size).to.equal(1);
      expect(subject.every(todo => !todo.get('isComplete'))).to.be(true);
    });
  });

  context('action.type = DELETE_TODO', function () {
    const action = {
      type: 'DELETE_TODO',
      payload: {
        id: 2,
      },
    };

    it('removes the correct todo', function () {
      const subject = todos(state, action);
      expect(subject.size).to.equal(1);
      expect(subject.every(todo => todo.get('id') !== 2)).to.be(true);
    });
  });

  context('action.type = EDIT_TODO', function () {
    const action = {
      type: 'EDIT_TODO',
      payload: {
        id: 2,
        label: 'New label',
      },
    };

    it('modifies the correct todo', function () {
      const subject = todos(state, action)

        .find(todo => todo.get('id') === 2);

      expect(subject.get('label')).to.equal('New label');
    });
  });


  context('action.type = FETCH_ALL_TODOS', function () {
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: {
        id: 2,
        todos: [{
          id: 1,
          label: 'A couple',
          isComplete: true,
        }, {
          id: 2,
          label: 'of new',
          isComplete: true,
        }, {
          id: 3,
          label: 'todos',
          isComplete: true,
        }, {
          id: 4,
          label: 'all completed',
          isComplete: true,
        }],
      },
    };

    it('sets todoList to the new fetched todos', function () {
      const subject = todos(state, action);
      expect(subject.size).to.equal(4);
      expect(subject.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  context('action.type = MARK_ALL_TODOS', function () {
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: {
        id: 2,
        isComplete: true,
      },
    };

    it('modifies all todos', function () {
      const subject = todos(state, action);
      expect(subject.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  context('action.type = MARK_TODO', function () {
    const action = {
      type: 'MARK_TODO',
      payload: {
        id: 2,
        isComplete: true,
      },
    };

    it('modifies the correct todo', function () {
      const subject = todos(state, action)
        .find(todo => todo.get('id') === 2);

      expect(subject.get('isComplete')).to.be(true);
    });
  });

  context('action.type = MOVE_TODO', function () {
    const action = {
      type: 'MOVE_TODO',
      payload: {
        at: 2,
        to: 1,
      },
    };

    // Adds a third todo with `index` 0 to ensure indices below `to` do not increment.
    const newState = state.push(new Todo());

    it('modifies the todo list indices correctly', function () {
      const subject = todos(newState, action);

      expect(subject.get(0).get('index')).to.equal(2);
      expect(subject.get(1).get('index')).to.equal(1);
      expect(subject.get(2).get('index')).to.equal(0);
    });
  });
});
