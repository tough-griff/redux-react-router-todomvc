import expect from 'expect.js';
import { List, Map, Record } from 'immutable';

import { todos } from '../../js/reducers';

describe('todos', () => {
  const Todo = Record({
    id: 0,
    index: 0,
    isComplete: false,
    label: 'new todo'
  });

  const state = Map({
    todoList: List([
      Todo({
        id: 1,
        index: 1,
        isComplete: true,
        label: 'Hello'
      }),
      Todo({
        id: 2,
        index: 2,
        isComplete: false,
        label: 'World'
      })
    ])
  });

  it('exposes a function', () => {
    expect(todos).to.be.a('function');
  });

  context('addTodo', () => {
    const action = {
      type: 'ADD_TODO',
      payload: {
        todo: {
          id: 3,
          label: 'New',
          isComplete: false
        }
      }
    };

    it('appends a new todo', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.equal(3);
      expect(subject.last().get('label')).to.equal('New');
    });
  });

  context('clearCompleteTodos', () => {
    const action = {
      type: 'CLEAR_COMPLETE_TODOS'
    };

    it('removes todos where isComplete = true', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.equal(1);
      expect(subject.every(todo => !todo.get('isComplete'))).to.be(true);
    });
  });

  context('deleteTodo', () => {
    const action = {
      type: 'DELETE_TODO',
      payload: {
        id: 2
      }
    };

    it('removes the correct todo', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.equal(1);
      expect(subject.every(todo => todo.get('id') !== 2)).to.be(true);
    });
  });

  context('editTodo', () => {
    const action = {
      type: 'EDIT_TODO',
      payload: {
        id: 2,
        label: 'New label'
      }
    };

    it('modifies the correct todo', () => {
      const subject = todos(state, action)
        .get('todoList')
        .find(todo => todo.get('id') === 2);

      expect(subject.get('label')).to.equal('New label');
    });
  });


  context('fetchAllTodos', () => {
    const action = {
      type: 'FETCH_ALL_TODOS',
      payload: {
        id: 2,
        todos: [{
          id: 1,
          label: 'A couple',
          isComplete: true
        }, {
          id: 2,
          label: 'of new',
          isComplete: true
        }, {
          id: 3,
          label: 'todos',
          isComplete: true
        }, {
          id: 4,
          label: 'all completed',
          isComplete: true
        }]
      }
    };

    it('sets todoList to the new fetched todos', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.size).to.equal(4);
      expect(subject.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  context('markAllTodos', () => {
    const action = {
      type: 'MARK_ALL_TODOS',
      payload: {
        id: 2,
        isComplete: true
      }
    };

    it('modifies all todos', () => {
      const subject = todos(state, action).get('todoList');
      expect(subject.every(todo => todo.get('isComplete'))).to.be(true);
    });
  });

  context('markTodo', () => {
    const action = {
      type: 'MARK_TODO',
      payload: {
        id: 2,
        isComplete: true
      }
    };

    it('modifies the correct todo', () => {
      const subject = todos(state, action)
        .get('todoList')
        .find(todo => todo.get('id') === 2);

      expect(subject.get('isComplete')).to.be(true);
    });
  });

  context('moveTodo', () => {
    const action = {
      type: 'MOVE_TODO',
      payload: {
        at: 2,
        to: 1
      }
    };

    it('modifies the todo list indices correctly', () => {
      const subject = todos(state, action).get('todoList');

      expect(subject.first().get('index')).to.equal(2);
      expect(subject.last().get('index')).to.equal(1);
    });
  });
});
