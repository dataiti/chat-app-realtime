import { Stack } from "@mui/material";

import ContactList from "~/components/conversation/contacts/ContactList";
import SearchBar from "./SearchBar";
import useAppSelector from "~/hooks/useAppSelector";
import { conversationSelect } from "~/store/slices/conversationSlice";
import { useEffect } from "react";
import { useSocket } from "~/context/SocketContext";
import { authSelect } from "~/store/slices/authSlice";

const Contact = () => {
     const socket = useSocket();
     const { userInfo } = useAppSelector(authSelect);
     const { contacts } = useAppSelector(conversationSelect);

     useEffect(() => {
          if (socket) {
               socket.emit("getContacts", {
                    userId: userInfo?._id,
               });
          }
     }, [socket, userInfo?._id]);

     return (
          <Stack
               spacing={1}
               sx={{
                    width: (theme) => theme.chatCustom.contactWidth,
                    padding: 2,
                    borderRight: "2px solid background.papper",
               }}
          >
               <SearchBar />
               <ContactList contacts={contacts} />
          </Stack>
     );
};

export default Contact;
