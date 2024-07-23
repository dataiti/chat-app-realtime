import express from "express";
import { authController } from "~/controllers/auth.controller";
import { authValidation } from "~/validations/auth.validation";

const Router = express.Router();

Router.route("/login").post(authValidation.login, authController.login);

Router.route("/register").post(
  authValidation.register,
  authController.register
);

Router.route("/logout").delete(authController.logout);

Router.route("/refresh-token").put(authController.refreshToken);

export const authRouter = Router;
