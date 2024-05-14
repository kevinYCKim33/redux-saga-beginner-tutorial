import "@babel/polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import Counter from "./Counter";
import reducer, { increment, incrementAsync, decrement } from "./reducers";
// import { helloSaga } from "./sagas";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// const store = createStore(reducer)
const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState().count}
      // onIncrement={() => action("INCREMENT")}
      // onDecrement={() => action("DECREMENT")}
      // onIncrementAsync={() => action("INCREMENT_ASYNC")}

      onIncrement={() => store.dispatch(increment())}
      onDecrement={() => store.dispatch(decrement())}
      onIncrementAsync={() => store.dispatch(incrementAsync())}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
