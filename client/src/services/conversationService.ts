import axiosInstance from "~/configs/axiosConfig";
import { CurrentConversationPayload } from "~/types/types";
import { GET_CURRENT_CONVERSATION_ENDPOINT } from "~/utils/constants";

export const getCurrentConversationService = async ({
  limit,
  senderId,
  recepientId,
  conversationType,
}: CurrentConversationPayload) => {
  return await axiosInstance.get(
    `${GET_CURRENT_CONVERSATION_ENDPOINT}?limit=${limit}&senderId=${senderId}&recepientId=${recepientId}&conversationType=${conversationType}`
  );
};
