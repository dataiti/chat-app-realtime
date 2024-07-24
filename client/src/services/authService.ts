import axiosInstance from "~/configs/axiosConfig";
import {
  LOGIN_ENDPOINT,
  REGISTER_ENDPOINT,
  LOGOUT_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
} from "~/utils/constants";
import { LoginFormValues, RegisterFormValues } from "~/types/types";

export const loginService = async (data: LoginFormValues) => {
  return await axiosInstance.post(LOGIN_ENDPOINT, data);
};

export const registerService = async (data: RegisterFormValues) => {
  return await axiosInstance.post(REGISTER_ENDPOINT, data);
};

export const logoutService = async () => {
  return await axiosInstance.post(LOGOUT_ENDPOINT);
};

export const refreshTokenService = async () => {
  return await axiosInstance.post(REFRESH_TOKEN_ENDPOINT);
};
