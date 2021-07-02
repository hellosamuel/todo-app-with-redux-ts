import { createAction, ActionType, createReducer } from 'typesafe-actions'

// const ADD_TODO = 'todos/ADD_TODO' as const
// const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const
// const REMOVE_TODO = 'todos/REMOVE_TODO' as const

const ADD_TODO = 'todos/ADD_TODO'
const TOGGLE_TODO = 'todos/TOGGLE_TODO'
const REMOVE_TODO = 'todos/REMOVE_TODO'

// export const addTodo = (text: string) => ({
//   type: ADD_TODO,
//   payload: text,
// })

// export const toggleTodo = (id: number) => ({
//   type: TOGGLE_TODO,
//   payload: id,
// })

// export const removeTodo = (id: number) => ({
//   type: REMOVE_TODO,
//   payload: id,
// })

export const addTodo = createAction(ADD_TODO)<string>()
export const toggleTodo = createAction(TOGGLE_TODO)<number>()
export const removeTodo = createAction(REMOVE_TODO)<number>()

// type TodosAction =
//   | ReturnType<typeof addTodo>
//   | ReturnType<typeof toggleTodo>
//   | ReturnType<typeof removeTodo>

const actions = { addTodo, toggleTodo, removeTodo }
type TodosAction = ActionType<typeof actions>
export interface Todo {
  id: number
  text: string
  done: boolean
}
type TodosState = Todo[]

const initialState: TodosState = [
  { id: 1, text: 'Learn TS', done: true },
  { id: 2, text: 'Learn TS with Redux', done: true },
  { id: 3, text: 'Make TodoList', done: false },
]

// function todos(state: TodosState = initialState, action: TodosAction): TodosState {
//   switch (action.type) {
//     case ADD_TODO: {
//       const nextId = state.length > 0 ? state[state.length - 1].id + 1 : 1
//       return state.concat({
//         id: nextId,
//         text: action.payload,
//         done: false,
//       })
//     }
//     case TOGGLE_TODO:
//       return state.map((todo) =>
//         todo.id === action.payload ? { ...todo, done: !todo.done } : todo
//       )
//     case REMOVE_TODO:
//       return state.filter((todo) => todo.id !== action.payload)
//     default:
//       return state
//   }
// }

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

// const todos = createReducer<TodosState, TodosAction>(initialState)
//   .handleAction(addTodo, (state, { payload: text }) =>
//     state.concat({
//       id: state.length > 0 ? state[state.length - 1].id + 1 : 1,
//       text,
//       done: false,
//     })
//   )
//   .handleAction(toggleTodo, (state, { payload: id }) =>
//     state.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
//   )
//   .handleAction(removeTodo, (state, { payload: id }) => state.filter((todo) => todo.id !== id))

export default todos
