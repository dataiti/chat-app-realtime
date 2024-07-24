import { all, fork } from "redux-saga/effects";

import authSaga from "~/store/sagas/authSaga";

function* rootSaga() {
  yield all([fork(authSaga)]);
}

export default rootSaga;
