import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import ConversationModel from "~/models/conversation.model";
import MessageModel from "~/models/message.model";
import ApiError from "~/utils/ApiError";

const getConversation = async (req, res, next) => {
  const { limit, senderId, recepientId, conversationType } = req.query;

  try {
    if (!senderId || !recepientId || !conversationType)
      throw new ApiError(
        StatusCodes.NOT_FOUND,
        "senderId, recepientId, conversationType is required"
      );

    const findConversation = await ConversationModel.findOne({
      $and: [
        {
          paticipants: { $all: [senderId, recepientId] },
        },
        {
          conversationType,
        },
      ],
    }).populate({
      path: "paticipants",
      select: "email avatar firstname lastname isOnline",
    });

    if (!findConversation)
      throw new ApiError(StatusCodes.NOT_FOUND, "Conversation is not found");

    const messages = await MessageModel.find({
      conversationId: findConversation._id,
    })
      .limit(parseInt(limit, 20))
      .populate({
        path: "senderId",
        select: "email avatar firstname lastname isOnline",
      });

    return res.status(StatusCodes.OK).json({
      status: "success",
      message: "Get conversation detail is successfully",
      data: {
        ...findConversation._doc,
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getConversationDetail = async (req, res, next) => {
  try {
    const result = await MessageModel.aggregate([
      {
        $match: {
          conversationId: new mongoose.Types.ObjectId(
            req.params.conversationId
          ),
          messageType: { $in: [, "IMAGE", "FILE", "LINK"] },
        },
      },
      {
        $group: {
          _id: "$messageType",
          count: { $sum: 1 },
          messages: {
            $push: {
              messageContent: "$messageContent",
              messageType: "$messageType",
              fileType: "$fileType",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          messageType: "$_id",
          count: 1,
          messages: 1,
        },
      },
    ]);

    return res.status(StatusCodes.OK).json({
      status: "success",
      message: "Get conversation messages successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const conversationController = {
  getConversation,
  getConversationDetail,
};
