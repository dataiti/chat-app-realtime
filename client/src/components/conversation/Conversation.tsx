import { Box, Stack } from "@mui/material";
import { useEffect, useRef } from "react";

import Footer from "~/components/conversation/Footer";
import Header from "~/components/conversation/Header";
import UserInfo from "~/components/conversation/UserInfo";
import MessageContent from "~/components/conversation/MessageContent";

import useAppSelector from "~/hooks/useAppSelector";
import { conversationSelect } from "~/store/slices/conversationSlice";

const Conversation = () => {
     const chatScrollRef = useRef<HTMLDivElement | null>(null);
     const { selectedContact, currentConversation } =
          useAppSelector(conversationSelect);

     useEffect(() => {
          if (chatScrollRef.current) {
               chatScrollRef.current.scrollIntoView({ behavior: "smooth" });
          }
     }, [selectedContact, currentConversation]);

     return (
          <Stack flexDirection="column" sx={{ width: "100%" }}>
               <Header />
               <Box
                    sx={{
                         flex: 1,
                         padding: 3,
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
