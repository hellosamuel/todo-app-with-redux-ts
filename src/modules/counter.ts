import { createAction, ActionType, createReducer } from 'typesafe-actions'

// const INCREASE = 'counter/INCREASE' as const
// const DECREASE = 'counter/DECREASE' as const
// const INCREASE_BY = 'counter/INCREASE_BY' as const

// because of typesafe-action, you can use string only as ACTION NAME without "as const"
const INCREASE = 'counter/INCREASE'
const DECREASE = 'counter/DECREASE'
const INCREASE_BY = 'counter/INCREASE_BY'

// export const increase = () => ({ type: INCREASE })
// export const decrease = () => ({ type: DECREASE })
// export const increaseBy = (diff: number) => ({
//   type: INCREASE_BY,
//   payload: diff,
// })

// you can use Generic for payload
export const increase = createAction(INCREASE)()
export const decrease = createAction(DECREASE)()
export const increaseBy = createAction(INCREASE_BY)<number>()

// sometimes you may need to additional payload not matching Generic like below
// const createItem = (name: string) => ({ type: CREATE_ITEM, payload: { id: nanoid(), name } });
// const createItem = createStandardAction(CREATE_ITEM).map(name => ({ payload: { id: nanoid(), name } }));

// type CounterAction =
//   | ReturnType<typeof increase>
//   | ReturnType<typeof decrease>
//   | ReturnType<typeof increaseBy>

const actions = { increase, decrease, increaseBy }
type CounterAction = ActionType<typeof actions>

interface CounterState {
  count: number
}

const initialState: CounterState = {
  count: 0,
}

// function counter(state: CounterState = initialState, action: CounterAction) {
//   switch (action.type) {
//     case INCREASE:
//       return { count: state.count + 1 }
//     case DECREASE:
//       return { count: state.count - 1 }
//     case INCREASE_BY:
//       return { count: state.count + action.payload }
//     default:
//       return state
//   }
// }

// you can using object instead of switch/case by using createReducer
const counter = createReducer<CounterState, CounterAction>(initialState, {
  [INCREASE]: (state) => ({ count: state.count + 1 }),
  [DECREASE]: (state) => ({ count: state.count - 1 }),
  [INCREASE_BY]: (state, action) => ({ count: state.count + action.payload }),
})

// you can use method chaining also
// const counter = createReducer<CounterState, CounterAction>(initialState)
//   .handleAction(increase, (state) => ({ count: state.count + 1 }))
//   .handleAction(decrease, (state) => ({ count: state.count - 1 }))
//   .handleAction(increaseBy, (state, action) => ({
//     count: state.count + action.payload,
//   }))

export default counter
