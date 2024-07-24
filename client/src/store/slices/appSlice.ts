import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { AppState } from "~/types/types";

const initialState: AppState = {
  openChatDetail: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleOpenChatDetail: (state) => {
      state.openChatDetail = !state.openChatDetail;
    },
  },
});

export const { toggleOpenChatDetail } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;
