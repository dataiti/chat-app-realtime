import axios from "axios";
import toast from "react-hot-toast";

import { store } from "~/store";
import { logout } from "~/store/slices/authSlice";
import { SERVER_BASE_URL } from "~/utils/constants";

const axiosInstance = axios.create({
     baseURL: SERVER_BASE_URL,
     timeout: 5000,
     headers: {
          "Content-Type": "application/json",
     },
});

axiosInstance.interceptors.request.use(
     (config) => {
          const accessToken = store.getState().auth.accessToken;

          if (accessToken) {
               config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          return config;
     },
     (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
     (response) => response,
     async (error) => {
          if (error.response.status === 401) {
               toast.error(error.response.data.message);
          } else if (error.response.status === 410) {
               store.dispatch(logout());
          } else if (error.response.status === 403) {
               localStorage.removeItem("accessToken");
               localStorage.removeItem("refreshToken");
               window.location.href = "/login";
          }
          return Promise.reject(error);
     }
);

export default axiosInstance;
