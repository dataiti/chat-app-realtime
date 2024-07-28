import axiosInstance from "~/configs/axiosConfig";
import { UPLOAD_FILE_ENDPOINT } from "~/utils/constants";

export const uploadFileMessageService = async (formData) => {
     return await axiosInstance.post(UPLOAD_FILE_ENDPOINT, formData, {
          headers: {
               "Content-Type": "multipart/form-data",
          },
     });
};
