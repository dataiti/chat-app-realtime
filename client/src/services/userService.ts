import axiosInstance from "~/configs/axiosConfig";
import { GET_ME_ENDPOINT, GET_SEARCH_USER_ENDPOINT } from "~/utils/constants";

export const getMeService = async () => {
  return await axiosInstance.get(GET_ME_ENDPOINT);
};

export const searchUserService = async (keyword: string, limit: number) => {
  return await axiosInstance.get(
    `${GET_SEARCH_USER_ENDPOINT}?keyword=${keyword}&${limit}`
  );
};
