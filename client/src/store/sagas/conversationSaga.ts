import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import {
     getCurrentConversationService,
     getContactsService,
     getConversationDetailService,
} from "~/services/conversationService";
import {
     fetchContacts,
     fetchContactsSuccess,
     fetchConversationDetail,
     fetchConversationDetailSuccess,
     fetchCurrentConversation,
     fetchCurrentConversationSucess,
} from "~/store/slices/conversationSlice";
import {
     ContactPayLoad,
     ContactResponse,
     ConversationDetailPayLoad,
     ConversationDetailResponse,
     ConversationResponse,
     CurrentConversationPayload,
} from "~/types";

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

function* handleGetContactsSaga(action: PayloadAction<ContactPayLoad>) {
     try {
          const response: AxiosResponse<ContactResponse> = yield call(
               getContactsService,
               action.payload
          );

          if (response.status === 200) {
               yield put(fetchContactsSuccess(response.data));
          }
     } catch (error) {
          console.log(error);
     }
}

function* handleGetConversationDetailSaga(
     action: PayloadAction<ConversationDetailPayLoad>
) {
     try {
          const response: AxiosResponse<ConversationDetailResponse> =
               yield call(getConversationDetailService, action.payload);

          if (response.status === 200) {
               yield put(fetchConversationDetailSuccess(response.data));
          }
     } catch (error) {
          console.log(error);
     }
}

function* watchConversationSaga() {
     yield takeLatest(
          fetchConversationDetail.type,
          handleGetConversationDetailSaga
     );
     yield takeLatest(fetchContacts.type, handleGetContactsSaga);
     yield takeLatest(
          fetchCurrentConversation.type,
          handleGetCurrentConversationSaga
     );
}

export default watchConversationSaga;
