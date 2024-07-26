import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "~/store";
import {
  ConversationDetailResponse,
  ConversationResponse,
  ConversationState,
  CurrentConversationPayload,
  Message,
  User,
} from "~/types/types";

const initialState: ConversationState = {
  contacts: [],
  currentConversation: null,
  selectedContact: null,
  chatDetail: [],
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchContacts: (state, _action: PayloadAction) => ({ ...state }),
    fetchContactsSucess: (state, action: PayloadAction) => {
      // state.contacts = action.payload
    },
    selectContact: (state, action: PayloadAction<User>) => {
      state.selectedContact = action.payload;
    },
    fetchCurrentConversation: (
      state,
      _action: PayloadAction<CurrentConversationPayload>
    ) => ({ ...state }),
    fetchCurrentConversationSucess: (
      state,
      action: PayloadAction<ConversationResponse>
    ) => {
      state.currentConversation = action.payload.data;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      state.currentConversation?.messages?.push(action.payload);
    },
    setChatDetail: (
      state,
      action: PayloadAction<ConversationDetailResponse>
    ) => {
      state.chatDetail = action.payload.data;
    },
  },
});

export const {
  fetchContacts,
  fetchContactsSucess,
  fetchCurrentConversation,
  fetchCurrentConversationSucess,
  addMessage,
  selectContact,
  setChatDetail,
} = conversationSlice.actions;

export const conversationSelect = (state: RootState) => state.conversation;

export default conversationSlice.reducer;
