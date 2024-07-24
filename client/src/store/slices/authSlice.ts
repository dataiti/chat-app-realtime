import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { authStateType, LoginResponse } from "~/types/types";
import { RootState } from "~/store";
import { getToken, saveToken } from "~/utils/token";

const initialState: authStateType = {
  userInfo: JSON.parse(localStorage.getItem("userInfo") || "null"),
  isAuthenticated: Boolean(getToken().accessToken),
  accessToken: getToken().accessToken || null,
  refreshToken: getToken().refreshToken || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredential: (state, action: PayloadAction<LoginResponse>) => {
      const { accessToken, refreshToken, data } = action.payload;

      state.isAuthenticated = true;
      state.userInfo = data;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    login: (state, action: PayloadAction<LoginResponse>) => {
      authSlice.caseReducers.setCredential(state, action);
    },
    register: (state, action: PayloadAction<LoginResponse>) => {
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

export const { login, register, logout } = authSlice.actions;

export const authSelect = (state: RootState) => state.auth;

export default authSlice.reducer;
