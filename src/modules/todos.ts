const ADD_TODO = 'todos/ADD_TODO' as const
const TOGGLE_TODO = 'todos/TOGGLE_TODO' as const
const REMOVE_TODO = 'todos/REMOVE_TODO' as const

export const addTodo = (text: string) => ({
  type: ADD_TODO,
  payload: text,
})

export const toggleTodo = (id: number) => ({
  type: TOGGLE_TODO,
  payload: id,
})

export const removeTodo = (id: number) => ({
  type: REMOVE_TODO,
  payload: id,
})

type TodosAction =
  | ReturnType<typeof addTodo>
  | ReturnType<typeof toggleTodo>
  | ReturnType<typeof removeTodo>

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

function todos(state: TodosState = initialState, action: TodosAction): TodosState {
  switch (action.type) {
    case ADD_TODO: {
      const nextId = state.length > 0 ? state[state.length - 1].id + 1 : 1
      return state.concat({
        id: nextId,
        text: action.payload,
        done: false,
      })
    }
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      )
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.payload)
    default:
      return state
  }
}

export default todos
