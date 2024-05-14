import { createReducer, createAction } from "@reduxjs/toolkit";

export const increment = createAction("INCREMENT");

export const decrement = createAction("DECREMENT");

export const incrementIfOdd = createAction("INCREMENT_IF_ODD");

// this gets used in saga
export const incrementAsync = createAction("INCREMENT_ASYNC");

const initialState = { count: 0 };
const counterToolkit = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state) => {
    state.count += 1;
  });

  builder.addCase(decrement, (state) => {
    state.count -= 1;
  });

  builder.addCase(incrementIfOdd, (state) => {
    state.count = state.count % 2 !== 0 ? state.count + 1 : state.count;
  });
});

// above essentially replaces below
// const counter = (state = { count: 0 }, action) => {
//   switch (action.type) {
//     case "INCREMENT":
//       return state.count + 1;
//     case "INCREMENT_IF_ODD":
//       return state.count % 2 !== 0 ? state.count + 1 : state.count;
//     case "DECREMENT":
//       return state.count - 1;
//     default:
//       return state.count;
//   }
// };

export default counterToolkit;
