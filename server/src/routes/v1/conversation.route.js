import express from "express";
import { conversationController } from "~/controllers/conversation.controller";
import { authMiddleware } from "~/middlewares/auth.middleware";

const Router = express.Router();

Router.route("/get-current-conversation").get(
  authMiddleware.isAuthorized,
  conversationController.getConversation
);

Router.route("/get-conversation-detail/:conversationId").get(
  conversationController.getConversationDetail
);

export const conversationRouter = Router;
