export const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URI;
export const CLIENT_BASE_URL = import.meta.env.VITE_REACT_APP_CLIENT_URI;

export const AUTH_RESOURCE = "/api/v1/auth";
export const LOGIN_ENDPOINT = `${AUTH_RESOURCE}/login`;
export const REGISTER_ENDPOINT = `${AUTH_RESOURCE}/register`;
export const LOGOUT_ENDPOINT = `${AUTH_RESOURCE}/logout`;
export const REFRESH_TOKEN_ENDPOINT = `${AUTH_RESOURCE}/refresh-token`;

export const CONVERSATION_RESOURCE = "/api/v1/conversation";
export const GET_CURRENT_CONVERSATION_ENDPOINT = `${CONVERSATION_RESOURCE}/get-current-conversation`;

export const USER_RESOURCE = "/api/v1/user";
export const GET_ME_ENDPOINT = `${USER_RESOURCE}/get-me`;
export const GET_SEARCH_USER_ENDPOINT = `${USER_RESOURCE}/search-user`;

export const MESSAGE_TYPE = {
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  FILE: "FILE",
  LINK: "LINK",
};
