import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
     {
          conversationId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Conversation",
               required: true,
          },
          senderId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
               required: true,
          },
          messageType: {
               type: String,
               default: "TEXT",
               enum: ["TEXT", "IMAGE", "FILE", "LINK"],
          },
          messageContent: {
               type: String,
          },
          fileType: {
               type: String,
               enum: ["UNKOWN", "DOC", "ZIP"],
          },
          isSeen: {
               type: Boolean,
               default: false,
          },
          isDeleted: {
               type: Boolean,
               default: false,
          },
     },
     { timestamps: true }
);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;
