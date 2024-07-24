import express from "express";
import { conversationController } from "~/controllers/conversation.controller";

const Router = express.Router();

Router.route("/:conversationId").get(
  conversationController.getConversationDetail
);

export const conversationRouter = Router;
