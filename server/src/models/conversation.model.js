import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
     {
          createtorId: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Conversation",
               required: true,
          },
          paticipants: [
               {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
               },
          ],
          conversationType: {
               type: String,
               default: "SINGLE",
               enum: ["SINGLE", "GROUP"],
          },
          isDeleted: {
               type: Boolean,
               default: false,
          },
     },
     { timestamps: true }
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;
