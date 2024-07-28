import axiosInstance from "~/configs/axiosConfig";
import {
     ContactPayLoad,
     ConversationDetailPayLoad,
     CurrentConversationPayload,
} from "~/types";
import {
     GET_CONTATCTS_ENDPOINT,
     GET_CONVERSATION_DETAIL_ENDPOINT,
     GET_CURRENT_CONVERSATION_ENDPOINT,
} from "~/utils/constants";

export const getCurrentConversationService = async ({
     limit,
     senderId,
     recepientId,
     conversationType,
}: CurrentConversationPayload) => {
     return await axiosInstance.get(GET_CURRENT_CONVERSATION_ENDPOINT, {
          params: {
               limit,
               senderId,
               recepientId,
               conversationType,
          },
     });
};

export const getContactsService = async ({
     conversationType,
}: ContactPayLoad) => {
     return await axiosInstance.get(GET_CONTATCTS_ENDPOINT, {
          params: {
               conversationType,
          },
     });
};

export const getConversationDetailService = async ({
     conversationId,
}: ConversationDetailPayLoad) => {
     return await axiosInstance.get(
          `${GET_CONVERSATION_DETAIL_ENDPOINT}/${conversationId}`
     );
};
