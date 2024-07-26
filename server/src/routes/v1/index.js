import express from "express";
import { StatusCodes } from "http-status-codes";

import { authRouter } from "~/routes/v1/auth.route";
import { conversationRouter } from "~/routes/v1/conversation.route";
import { messageRouter } from "~/routes/v1/message.route";
import { userRouter } from "~/routes/v1/user.route";

const Router = express.Router();

Router.get("/status", (req, res) =>
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use." })
);

Router.use("/auth", authRouter);
Router.use("/conversation", conversationRouter);
Router.use("/message", messageRouter);
Router.use("/user", userRouter);

export const APIs_V1 = Router;
