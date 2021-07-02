import { createReducer } from 'typesafe-actions'
import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO } from './actions'
import { TodosAction, TodosState } from './types'

const initialState: TodosState = [
  { id: 1, text: 'Learn TS', done: true },
  { id: 2, text: 'Learn TS with Redux', done: true },
  { id: 3, text: 'Make TodoList', done: false },
]

const todos = createReducer<TodosState, TodosAction>(initialState, {
  [ADD_TODO]: (state, { payload: text }) =>
    state.concat({
      id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
      text,
      done: false,
    }),
  [TOGGLE_TODO]: (state, { payload: id }) =>
    state.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)),
  [REMOVE_TODO]: (state, { payload: id }) => state.filter((todo) => todo.id !== id),
})

export default todos
