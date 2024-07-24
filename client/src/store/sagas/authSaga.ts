import { PayloadAction } from "@reduxjs/toolkit";
import { call, takeLatest, put } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import { loginService, registerService } from "~/services/authService";
import { login, register } from "~/store/slices/authSlice";
import {
  LoginFormValues,
  LoginResponse,
  RegisterFormValues,
} from "~/types/types";
import { saveToken } from "~/utils/token";

function* loginSaga(action: PayloadAction<LoginFormValues>) {
  try {
    const response: AxiosResponse<LoginResponse> = yield call(
      loginService,
      action.payload
    );
    if (response.status === 200) {
      console.log(response.data);

      const { accessToken, refreshToken, data } = response.data;

      localStorage.setItem("userInfo", JSON.stringify(data));
      saveToken(accessToken, refreshToken);
      yield put(login(response.data));
    }
  } catch (error) {}
}

function* registerSaga(action: PayloadAction<RegisterFormValues>) {
  try {
    const response: AxiosResponse = yield call(registerService, action.payload);
    if (response.status === 201) {
      const { accessToken, refreshToken, data } = response.data;

      localStorage.setItem("userInfo", JSON.stringify(data));
      saveToken(accessToken, refreshToken);
      yield put(register(response.data));
    }
  } catch (error) {}
}

function* authSaga() {
  yield takeLatest(login.type, loginSaga);
  yield takeLatest(register.type, registerSaga);
}

export default authSaga;
