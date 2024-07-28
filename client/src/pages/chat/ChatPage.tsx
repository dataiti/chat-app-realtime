import { Stack } from "@mui/material";
import { useEffect } from "react";

import Contact from "~/components/conversation/contacts/Contact";
import Conversation from "~/components/conversation/Conversation";
import ConversationDetail from "~/components/conversation/detail/ConversationDetail";
import useAppSelector from "~/hooks/useAppSelector";
import { appSelect } from "~/store/slices/appSlice";
import { authSelect } from "~/store/slices/authSlice";
import {
     conversationSelect,
     fetchCurrentConversation,
} from "~/store/slices/conversationSlice";
import useAppDispatch from "~/hooks/useAppDispatch";

const ChatPage = () => {
     const dispatch = useAppDispatch();
     const { userInfo } = useAppSelector(authSelect);
     const { openChatDetail } = useAppSelector(appSelect);
     const { selectedContact } = useAppSelector(conversationSelect);

     useEffect(() => {
          if (selectedContact && userInfo) {
               dispatch(
                    fetchCurrentConversation({
                         limit: 20,
                         senderId: userInfo._id,
                         recepientId: selectedContact?._id,
                         conversationType: "SINGLE",
                    })
               );
          }
     }, [selectedContact, userInfo]);

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
