import express from "express";
import { userController } from "~/controllers/user.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";

const Router = express.Router();

Router.route("/get-me").get(authMiddleware.isAuthorized, userController.getMe);

Router.route("/search-user").get(
  authMiddleware.isAuthorized,
  userController.searchUserByKeyword
);

export const userRouter = Router;
