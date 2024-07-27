import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { getCurrentConversationService } from "~/services/conversationService";
import {
     fetchCurrentConversation,
     fetchCurrentConversationSucess,
} from "~/store/slices/conversationSlice";
import { ConversationResponse, CurrentConversationPayload } from "~/types";

function* handleGetCurrentConversationSaga(
     action: PayloadAction<CurrentConversationPayload>
) {
     try {
          const response: AxiosResponse<ConversationResponse> = yield call(
               getCurrentConversationService,
               action.payload
          );

          if (response.status === 200) {
               yield put(fetchCurrentConversationSucess(response.data));
          }
     } catch (error) {
          console.log(error);
     }
}

function* watchConversationSaga() {
     yield takeLatest(
          fetchCurrentConversation.type,
          handleGetCurrentConversationSaga
     );
}

export default watchConversationSaga;
