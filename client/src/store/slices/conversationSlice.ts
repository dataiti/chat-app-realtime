import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
     Contact,
     ContactPayLoad,
     ContactResponse,
     Conversation,
     ConversationDetailPayLoad,
     ConversationDetailResponse,
     ConversationResponse,
     CurrentConversationPayload,
     Message,
     MessageGroup,
     User,
} from "~/types";
import { RootState } from "~/store";

interface ConversationState {
     contacts: Contact[];
     currentConversation: Conversation | null;
     selectedContact: User | null;
     chatDetail: MessageGroup[];
}

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
          fetchContacts: (state, _action: PayloadAction<ContactPayLoad>) => ({
               ...state,
          }),
          fetchContactsSuccess: (
               state,
               action: PayloadAction<ContactResponse>
          ) => {
               state.contacts = action.payload.data;
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
          clearCurrentConversation: (state) => {
               state.currentConversation = null;
               state.chatDetail = [];
          },
          addMessage: (state, action: PayloadAction<Message>) => {
               state.currentConversation?.messages?.push(action.payload);
          },
          fetchConversationDetail: (
               state,
               _action: PayloadAction<ConversationDetailPayLoad>
          ) => ({
               ...state,
          }),
          fetchConversationDetailSuccess: (
               state,
               action: PayloadAction<ConversationDetailResponse>
          ) => {
               state.chatDetail = action.payload.data;
          },
          resetConversation: (state) => {
               state.chatDetail = [];
               state.contacts = [];
               state.currentConversation = null;
               state.selectedContact = null;
          },
     },
});

export const {
     fetchContacts,
     fetchContactsSuccess,
     fetchCurrentConversation,
     fetchCurrentConversationSucess,
     clearCurrentConversation,
     addMessage,
     selectContact,
     fetchConversationDetail,
     fetchConversationDetailSuccess,
     resetConversation,
} = conversationSlice.actions;

export const conversationSelect = (state: RootState) => state.conversation;

export default conversationSlice.reducer;
