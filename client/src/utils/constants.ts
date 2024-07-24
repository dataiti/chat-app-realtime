export const SERVER_BASE_URL = import.meta.env.VITE_REACT_APP_SERVER_URI;

export const AUTH_RESOURCE = "api/v1/auth";
export const LOGIN_ENDPOINT = `${AUTH_RESOURCE}/login`;
export const REGISTER_ENDPOINT = `${AUTH_RESOURCE}/register`;
export const LOGOUT_ENDPOINT = `${AUTH_RESOURCE}/logout`;
export const REFRESH_TOKEN_ENDPOINT = `${AUTH_RESOURCE}/refresh-token`;

export const CONVERSATION_RESOURCE = "api/v1/conversation";
export const GET_CONVERSATION_DETAIL_ENDPOINT = `${AUTH_RESOURCE}`;
