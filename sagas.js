import { put, takeEvery, all } from "redux-saga/effects";
import { increment, incrementAsync as incrementAsyncAction } from "./reducers";

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export function* helloSaga() {
  console.log("Hello Sagas!");
}

// export function* incrementAsync() {
//   yield delay(1000);
//   yield put({ type: "INCREMENT" });
// }
export function* incrementAsync() {
  yield delay(1000);
  yield put(increment());
}

// export function* watchIncrementAsync() {
//   yield takeEvery("INCREMENT_ASYNC", incrementAsync);
// }
export function* watchIncrementAsync() {
  // hmm not sure why not incrementAsyncAction()
  yield takeEvery(incrementAsyncAction, incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
