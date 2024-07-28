import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import toast from "react-hot-toast";

import { loginService, registerService } from "~/services/authService";
import {
     login,
     loginSuccess,
     register,
     registerSucess,
     updateUser,
} from "~/store/slices/authSlice";
import {
     GetMeResponse,
     LoginFormValues,
     CredentialResponse,
     RegisterFormValues,
} from "~/types";
import { saveToken } from "~/utils/token";
import { getMeService } from "~/services/userService";

function* handleGetMeSaga() {
     try {
          const response: AxiosResponse<GetMeResponse> = yield call(
               getMeService
          );

          if (response.status === 200) {
               yield put(updateUser(response.data));
          }
     } catch (error) {
          console.log(error);
     }
}

function* handleLoginSaga(action: PayloadAction<LoginFormValues>) {
     try {
          const response: AxiosResponse<CredentialResponse> = yield call(
               loginService,
               action.payload
          );

          if (response.status === 200) {
               const { refreshToken, accessToken } = response.data;

               saveToken(accessToken, refreshToken);
               yield put(loginSuccess(response.data));
               yield call(handleGetMeSaga);
               toast.success("Login successfully");
          }
     } catch (error) {
          console.log(error);
     }
}

function* handleRegisterSaga(action: PayloadAction<RegisterFormValues>) {
     try {
          const response: AxiosResponse<CredentialResponse> = yield call(
               registerService,
               action.payload
          );
          if (response.status === 201) {
               yield call(handleGetMeSaga);
               yield put(registerSucess(response.data));
               toast.success("Created new account successfully");
          }
     } catch (error) {
          console.log(error);
     }
}

function* watchAuthSaga() {
     yield takeLatest(login.type, handleLoginSaga);
     yield takeLatest(register.type, handleRegisterSaga);
}

export default watchAuthSaga;
