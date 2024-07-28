import { Box, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Contact from "~/components/conversation/contacts/Contact";
import ConversationDetail from "~/components/conversation/detail/ConversationDetail";
import useAppSelector from "~/hooks/useAppSelector";
import { appSelect } from "~/store/slices/appSlice";
import { authSelect } from "~/store/slices/authSlice";
import {
     conversationSelect,
     fetchCurrentConversation,
} from "~/store/slices/conversationSlice";
import useAppDispatch from "~/hooks/useAppDispatch";
import Header from "~/components/conversation/Header";
import UserInfo from "~/components/conversation/UserInfo";
import MessageContent from "~/components/conversation/MessageContent";
import Footer from "~/components/conversation/Footer";

const ChatPage = () => {
     const dispatch = useAppDispatch();
     const { userInfo } = useAppSelector(authSelect);
     const { openChatDetail } = useAppSelector(appSelect);
     const { selectedContact } = useAppSelector(conversationSelect);
     const chatBoxRef = useRef<HTMLDivElement | null>(null);
     const [limit, setLimit] = useState<number>(8);

     useEffect(() => {
          if (selectedContact && userInfo) {
               dispatch(
                    fetchCurrentConversation({
                         limit,
                         senderId: userInfo._id,
                         recepientId: selectedContact?._id,
                         conversationType: "SINGLE",
                    })
               );
          }
     }, [userInfo, selectedContact, limit]);

     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
          const target = e.target as HTMLDivElement;
          if (target.scrollTop === 0) {
               setLimit((prev) => prev + 8);
          }
     };

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
                    <Stack flexDirection="column" sx={{ width: "100%" }}>
                         <Header />
                         <Box
                              ref={chatBoxRef}
                              onScroll={handleScroll}
                              sx={{
                                   flex: 1,
                                   padding: 3,
                                   overflowY: "scroll",
                                   scrollbarWidth: "none",
                                   gap: 1,
                              }}
                         >
                              {selectedContact && <UserInfo />}
                              <MessageContent />
                         </Box>
                         <Footer />
                    </Stack>
               </Stack>
               {openChatDetail && <ConversationDetail />}
          </Stack>
     );
};

export default ChatPage;
