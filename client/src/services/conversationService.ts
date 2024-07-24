import axiosInstance from "~/configs/axiosConfig";
import { GET_CONVERSATION_DETAIL_ENDPOINT } from "~/utils/constants";

export const getConversationDetailService = async (
  conversationId: string,
  limit: number
) => {
  return await axiosInstance.get(
    `${GET_CONVERSATION_DETAIL_ENDPOINT}/${conversationId}?limit=${limit}`
  );
};
