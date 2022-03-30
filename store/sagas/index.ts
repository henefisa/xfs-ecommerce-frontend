import { all, fork } from "redux-saga/effects";

import authSaga from "./authSaga";
import productsSaga from "./productsSaga";

export default function* rootSaga() {
  yield all([fork(authSaga)]);
  yield all([fork(productsSaga)]);
}
