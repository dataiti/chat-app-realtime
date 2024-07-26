import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/store";
import { getToken, saveToken } from "~/utils/token";
import {
     CredentialResponse,
     GetMeResponse,
     LoginFormValues,
     RegisterFormValues,
     User,
} from "~/types";

export interface AuthState {
     userInfo: User | null;
     isAuthenticated: boolean;
     accessToken: string | null;
     refreshToken: string | null;
}

const initialState: AuthState = {
     userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
     isAuthenticated: Boolean(getToken().accessToken) || false,
     accessToken: getToken().accessToken || null,
     refreshToken: getToken().refreshToken || null,
};

const authSlice = createSlice({
     name: "auth",
     initialState,
     reducers: {
          updateUser: (state, action: PayloadAction<GetMeResponse>) => {
               state.userInfo = action.payload.data;
               localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
          },
          setCredential: (state, action: PayloadAction<CredentialResponse>) => {
               const { accessToken, refreshToken } = action.payload;
               state.isAuthenticated = true;
               state.accessToken = accessToken;
               state.refreshToken = refreshToken;
          },
          login: (state, _action: PayloadAction<LoginFormValues>) => ({
               ...state,
          }),
          loginSuccess: (state, action: PayloadAction<CredentialResponse>) => {
               authSlice.caseReducers.setCredential(state, action);
          },
          register: (state, _action: PayloadAction<RegisterFormValues>) => ({
               ...state,
          }),
          registerSucess: (
               state,
               action: PayloadAction<CredentialResponse>
          ) => {
               authSlice.caseReducers.setCredential(state, action);
          },
          logout: (state) => {
               state.isAuthenticated = false;
               state.userInfo = null;
               state.accessToken = null;
               state.refreshToken = null;
               localStorage.removeItem("userInfo");
               saveToken(null, null);
          },
     },
});

export const {
     updateUser,
     login,
     loginSuccess,
     register,
     registerSucess,
     logout,
} = authSlice.actions;

export const authSelect = (state: RootState) => state.auth;

export default authSlice.reducer;
