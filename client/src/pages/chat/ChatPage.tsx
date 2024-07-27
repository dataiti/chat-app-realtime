import { Stack } from "@mui/material";
import { useEffect, useState } from "react";

import Contact from "~/components/conversation/contacts/Contact";
import Conversation from "~/components/conversation/Conversation";
import ConversationDetail from "~/components/conversation/detail/ConversationDetail";
import useAppSelector from "~/hooks/useAppSelector";
import { selectApp } from "~/store/slices/appSlice";
import { useSocket } from "~/context/SocketContext";
import { authSelect } from "~/store/slices/authSlice";
import { conversationSelect } from "~/store/slices/conversationSlice";

const ChatPage = () => {
     const socket = useSocket();
     const { userInfo } = useAppSelector(authSelect);
     const { openChatDetail } = useAppSelector(selectApp);
     const { currentConversation } = useAppSelector(conversationSelect);

     const [isSocketConnected, setIsSocketConnected] = useState(false);

     useEffect(() => {
          if (socket) {
               socket.on("connect", () => {
                    setIsSocketConnected(true);
               });

               return () => {
                    socket.off("connect");
               };
          }
     }, [socket]);

     useEffect(() => {
          if (isSocketConnected) {
               socket?.emit("getContacts", {
                    userId: userInfo?._id,
               });
          }
     }, [isSocketConnected, socket, userInfo?._id]);

     useEffect(() => {
          if (isSocketConnected) {
               socket?.emit("getConversationDetail", {
                    conversationId: currentConversation?._id,
                    userId: userInfo?._id,
               });
          }
     }, [isSocketConnected, socket, userInfo?._id, currentConversation?._id]);

     return (
          <Stack direction="row" height="100%">
               <Stack
                    direction="row"
                    sx={{
                         backgroundColor: "background.paper",
                         borderRadius: 6,
                         width: (theme) =>
                              openChatDetail
                                   ? `calc(100% - ${theme.chatCustom.chatDetailWidth})`
                                   : "100%",
                         height: "100%",
                         transition: "ease-in-out",
                    }}
               >
                    <Contact />
                    <Conversation />
               </Stack>
               {openChatDetail && <ConversationDetail />}
          </Stack>
     );
};

export default ChatPage;
