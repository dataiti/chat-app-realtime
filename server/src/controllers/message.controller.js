import { mkdirSync, renameSync } from "fs";
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";

const uploadFile = async (req, res, next) => {
     try {
          if (!req.file)
               throw new ApiError(StatusCodes.NOT_FOUND, "File not found");

          const date = Date.now();
          let fileDir = `uploads/files/${date}`;
          let filename = `${fileDir}/${req.file.originalname}`;

          mkdirSync(fileDir, { recursive: true });
          renameSync(req.file.path, filename);

          return res.status(StatusCodes.OK).json({
               status: "success",
               message: "Upload file is sucessfully",
               data: filename,
          });
     } catch (error) {
          next(error);
     }
};

export const messageController = {
     uploadFile,
};
