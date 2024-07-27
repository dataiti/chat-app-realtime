import { Box, Stack } from "@mui/material";
import { useEffect, useRef } from "react";

import Footer from "~/components/conversation/Footer";
import Header from "~/components/conversation/Header";
import UserInfo from "~/components/conversation/UserInfo";
import MessageContent from "~/components/conversation/MessageContent";

import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";

import { authSelect } from "~/store/slices/authSlice";
import {
     conversationSelect,
     fetchCurrentConversation,
} from "~/store/slices/conversationSlice";

const Conversation = () => {
     const chatScrollRef = useRef<HTMLDivElement | null>(null);
     const dispatch = useAppDispatch();
     const { userInfo } = useAppSelector(authSelect);
     const { selectedContact, currentConversation } =
          useAppSelector(conversationSelect);

     useEffect(() => {
          if (chatScrollRef.current) {
               chatScrollRef.current.scrollIntoView({ behavior: "smooth" });
          }
     }, [selectedContact, currentConversation]);

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
          <Stack flexDirection="column" sx={{ width: "100%" }}>
               <Header />
               <Box
                    ref={chatScrollRef}
                    sx={{
                         flex: 1,
                         padding: 2,
                         overflowY: "scroll",
                         scrollbarWidth: "none",
                         gap: 1,
                    }}
               >
                    {selectedContact && <UserInfo />}
                    <Box>
                         <MessageContent />
                    </Box>
               </Box>
               <Footer />
          </Stack>
     );
};

export default Conversation;
