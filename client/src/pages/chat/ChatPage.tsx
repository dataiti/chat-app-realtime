import { Stack } from "@mui/material";
import { useEffect } from "react";

import Contact from "~/components/conversation/contacts/Contact";
import Conversation from "~/components/conversation/Conversation";
import ConversationDetail from "~/components/conversation/detail/ConversationDetail";
import useAppSelector from "~/hooks/useAppSelector";
import { selectApp } from "~/store/slices/appSlice";

const ChatPage = () => {
     const { openChatDetail } = useAppSelector(selectApp);

     let conversationId = "66a1fe3de8dbfe58599be9c8";

     useEffect(() => {
          if (openChatDetail && conversationId) {
          }
     }, []);

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
               {openChatDetail && conversationId && <ConversationDetail />}
          </Stack>
     );
};

export default ChatPage;
