import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
     ContactItemType,
     Conversation,
     ConversationDetailResponse,
     ConversationResponse,
     CurrentConversationPayload,
     Message,
     MessageGroup,
     User,
} from "~/types";
import { RootState } from "~/store";

interface ConversationState {
     contacts: ContactItemType[];
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
