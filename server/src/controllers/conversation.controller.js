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

          const total = await ConversationModel.countDocuments({
               $and: [
                    { paticipants: { $all: [senderId, recepientId] } },
                    { conversationType },
               ],
          });

          const findConversation = await ConversationModel.findOne({
               $and: [
                    { paticipants: { $all: [senderId, recepientId] } },
                    { conversationType },
               ],
          }).populate({
               path: "paticipants",
               select: "email avatar firstname lastname isOnline",
          });

          if (!findConversation)
               throw new ApiError(
                    StatusCodes.NOT_FOUND,
                    "Conversation is not found"
               );

          const messages = await MessageModel.find({
               conversationId: findConversation._id,
          })
               .sort({ createdAt: -1 })
               .limit(parseInt(limit))
               .populate({
                    path: "senderId",
                    select: "email avatar firstname lastname isOnline",
               });

          return res.status(StatusCodes.OK).json({
               status: "success",
               message: "Get conversation detail is successfully",
               data: {
                    total: messages.length,
                    ...findConversation._doc,
                    messages,
               },
          });
     } catch (error) {
          next(error);
     }
};

const getConversationDetail = async (req, res, next) => {
     const { conversationId } = req.params;

     try {
          const result = await MessageModel.aggregate([
               {
                    $match: {
                         conversationId: new mongoose.Types.ObjectId(
                              conversationId
                         ),
                         messageType: { $in: ["IMAGE", "FILE", "LINK"] },
                         isDeleted: false,
                    },
               },
               { $sort: { createdAt: -1 } },
               {
                    $group: {
                         _id: "$messageType",
                         count: { $sum: 1 },
                         messages: {
                              $push: {
                                   _id: "$_id",
                                   conversationId: "$conversationId",
                                   senderId: "$senderId",
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

          const order = ["LINK", "FILE", "IMAGE"];
          const sortedResult = result.sort(
               (a, b) =>
                    order.indexOf(b.messageType) - order.indexOf(a.messageType)
          );

          return res.status(StatusCodes.OK).json({
               status: "success",
               message: "Get conversation messages successfully",
               data: result,
          });
     } catch (sortedResult) {
          next(error);
     }
};

const getContacts = async (req, res, next) => {
     const { conversationType } = req.query;

     const userId = new mongoose.Types.ObjectId(req.jwtDecoded._id);

     let matchConditions = {
          paticipants: { $in: [userId] },
          isDeleted: false,
     };

     if (conversationType && conversationType !== "ALL") {
          matchConditions.conversationType = conversationType.toUpperCase();
     }

     try {
          const contacts = await ConversationModel.aggregate([
               {
                    $match: matchConditions,
               },
               {
                    $lookup: {
                         from: "messages",
                         localField: "_id",
                         foreignField: "conversationId",
                         as: "messages",
                    },
               },
               {
                    $unwind: "$messages",
               },
               {
                    $group: {
                         _id: "$_id",
                         paticipants: { $last: "$paticipants" },
                         conversationType: { $last: "$conversationType" },
                         lastMessage: { $last: "$messages" },
                    },
               },
               {
                    $addFields: {
                         userContact: {
                              $arrayElemAt: [
                                   {
                                        $filter: {
                                             input: "$paticipants",
                                             as: "user",
                                             cond: {
                                                  $ne: ["$$user", userId],
                                             },
                                        },
                                   },
                                   0,
                              ],
                         },
                    },
               },
               {
                    $lookup: {
                         from: "users",
                         localField: "userContact",
                         foreignField: "_id",
                         as: "userContact",
                    },
               },
               {
                    $unwind: "$userContact",
               },
               {
                    $project: {
                         _id: 1,
                         conversationType: 1,
                         userContact: {
                              _id: 1,
                              firstname: 1,
                              lastname: 1,
                              email: 1,
                              avatar: 1,
                         },
                         lastMessage: {
                              _id: 1,
                              senderId: 1,
                              messageType: 1,
                              messageContent: 1,
                              fileType: 1,
                              isSeen: 1,
                              createdAt: 1,
                              updatedAt: 1,
                         },
                    },
               },
               {
                    $sort: {
                         "lastMessage.createdAt": -1,
                    },
               },
          ]);

          return res.status(StatusCodes.OK).json({
               status: "success",
               message: "Get contacts is successfully",
               data: contacts,
          });
     } catch (error) {
          next(error);
     }
};

export const conversationController = {
     getConversation,
     getConversationDetail,
     getContacts,
};
