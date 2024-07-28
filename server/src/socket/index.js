import mongoose from "mongoose";
import { Server as SocketIOServer } from "socket.io";

import { env } from "~/configs/environtment.config";
import ConversationModel from "~/models/conversation.model";
import MessageModel from "~/models/message.model";
import UserModel from "~/models/user.model";
import { getFileType, getMessageType } from "~/utils/algorithm";

const setupSocket = (server) => {
     const io = new SocketIOServer(server, {
          cors: {
               origin: env.CLIENT_DOMAIN,
               methods: ["GET", "POST"],
               credentials: true,
          },
     });

     const userSocketMap = new Map();

     const updateUserOnlineStatus = async (userId, isOnline) => {
          try {
               await UserModel.findByIdAndUpdate(
                    userId,
                    { isOnline },
                    { new: true }
               );
          } catch (error) {}
     };

     const createGroupConversation = async (message) => {
          try {
          } catch (error) {}
     };

     const sendMessage = async (message) => {
          const { conversationId, senderId, recepientId, messageContent } =
               message;

          let currentConversationId = conversationId;

          try {
               const senderSocketId = userSocketMap.get(senderId);
               const recepientSocketId = userSocketMap.get(recepientId);

               const findConversation = await ConversationModel.findOne({
                    paticipants: { $all: [senderId, recepientId] },
               });

               if (!findConversation) {
                    const newConversation = await ConversationModel.create({
                         createtorId: senderId,
                         paticipants: [senderId, recepientId],
                    });

                    currentConversationId = newConversation._id;
               } else {
                    currentConversationId = findConversation._id;
               }

               const newMessage = new MessageModel({
                    conversationId: currentConversationId,
                    senderId,
                    messageContent,
                    messageType: getMessageType(messageContent),
               });

               if (getMessageType(messageContent) === "FILE") {
                    newMessage.fileType = getFileType(messageContent);
               }

               await newMessage.save();

               const findMessage = await MessageModel.findById(
                    newMessage._id
               ).populate({
                    path: "senderId",
                    select: "_id firstname lastname avatar email",
               });

               if (senderSocketId) {
                    io.to(senderSocketId).emit("receiveMessage", {
                         status: "success",
                         message: "Receive message is successfully",
                         data: findMessage,
                    });
               }
               if (recepientSocketId) {
                    io.to(recepientSocketId).emit("receiveMessage", {
                         status: "success",
                         message: "Receive message is successfully",
                         data: findMessage,
                    });
               }
          } catch (error) {
               console.log(error);
          }
     };

     const disconnect = async (socket) => {
          console.log(`Client disconected: ${socket.id}`);

          for (const [userId, socketId] of userSocketMap.entries()) {
               if (socketId === socket.id) {
                    userSocketMap.delete(userId);
                    await updateUserOnlineStatus(userId, false);
                    break;
               }
          }
     };

     io.on("connection", async (socket) => {
          const userId = socket.handshake.query.userId;

          if (userId) {
               userSocketMap.set(userId, socket.id);
               console.log(
                    `✅ User ${userId} connected socket is successfully with socket ID: ${socket.id}`
               );
               await updateUserOnlineStatus(userId, true);
          } else {
               console.log("User ID not provided during connection");
          }

          socket.on("createGroup", createGroupConversation);
          socket.on("sendMessage", sendMessage);
          socket.on("disconnect", () => disconnect(socket));
     });
};

export default setupSocket;
