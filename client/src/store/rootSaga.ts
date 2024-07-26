import { all, fork } from "redux-saga/effects";

import authSaga from "~/store/sagas/authSaga";
import conversationSagaaga from "~/store/sagas/conversationSaga";

function* rootSaga() {
  yield all([fork(authSaga), fork(conversationSagaaga)]);
}

export default rootSaga;
