import express from "express";
import multer from "multer";
import { messageController } from "~/controllers/message.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";

const Router = express.Router();
const upload = multer({ dest: "uploads/files" });

Router.route("/upload-file").post(
     authMiddleware.isAuthorized,
     upload.single("file"),
     messageController.uploadFile
);

export const messageRouter = Router;
