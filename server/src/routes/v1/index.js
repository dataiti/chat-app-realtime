import express from "express";
import { StatusCodes } from "http-status-codes";

import { authRouter } from "~/routes/v1/auth.route";

const Router = express.Router();

Router.get("/status", (req, res) =>
  res.status(StatusCodes.OK).json({ message: "APIs V1 are ready to use." })
);

Router.use("/auth", authRouter);

export const APIs_V1 = Router;
