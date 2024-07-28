import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "~/store";
import { ConversationType } from "~/types";

interface AppState {
     openChatDetail: boolean;
     tabConversationType: ConversationType;
}

const initialState: AppState = {
     openChatDetail: true,
     tabConversationType: "ALL",
};

const appSlice = createSlice({
     name: "app",
     initialState,
     reducers: {
          toggleOpenChatDetail: (state) => {
               state.openChatDetail = !state.openChatDetail;
          },
          setConversationType: (state, action) => {
               state.tabConversationType = action.payload;
          },
     },
});

export const { toggleOpenChatDetail, setConversationType } = appSlice.actions;

export const appSelect = (state: RootState) => state.app;

export default appSlice.reducer;
