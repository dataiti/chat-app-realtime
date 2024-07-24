import { StatusCodes } from "http-status-codes";
import ConversationModel from "~/models/conversation.model";
import messageModel from "~/models/message.model";
import ApiError from "~/utils/ApiError";

const getConversationDetail = async (req, res, next) => {
  const { conversationId } = req.params;
  const { limit } = req.query;

  try {
    const findConversation = await ConversationModel.findById(
      conversationId
    ).populate("paticipants", "email avatar firstName lastName isOnline");

    if (!findConversation)
      throw new ApiError(StatusCodes.NOT_FOUND, "Conversation is not found");

    const messages = await messageModel
      .find({
        conversationId: findConversation._id,
      })
      .limit(parseInt(limit, 20));

    return res.status(StatusCodes.OK).json({
      status: "success",
      message: "Get conversation detail is successfully",
      data: {
        ...findConversation.toObject({
          versionKey: false,
        }),
        messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const conversationController = { getConversationDetail };
