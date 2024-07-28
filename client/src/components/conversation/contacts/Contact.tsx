import { useEffect } from "react";
import { Box, Stack, Tab, Tabs } from "@mui/material";

import ContactList from "~/components/conversation/contacts/ContactList";
import SearchBar from "~/components/conversation/contacts/SearchBar";
import useAppSelector from "~/hooks/useAppSelector";
import {
     conversationSelect,
     fetchContacts,
} from "~/store/slices/conversationSlice";
import { authSelect } from "~/store/slices/authSlice";
import useAppDispatch from "~/hooks/useAppDispatch";
import { ConversationType } from "~/types";
import { appSelect, setConversationType } from "~/store/slices/appSlice";

const Contact = () => {
     const dispatch = useAppDispatch();
     const { userInfo } = useAppSelector(authSelect);
     const { contacts } = useAppSelector(conversationSelect);
     const { tabConversationType } = useAppSelector(appSelect);

     useEffect(() => {
          if (userInfo) {
               dispatch(
                    fetchContacts({ conversationType: tabConversationType })
               );
          }
     }, [userInfo, tabConversationType]);

     const handleChange = (
          _event: React.SyntheticEvent,
          newValue: ConversationType
     ) => {
          dispatch(setConversationType(newValue));
     };

     return (
          <Stack
               spacing={1}
               sx={{
                    width: (theme) => theme.chatCustom.contactWidth,
                    padding: 2,
               }}
          >
               <SearchBar />
               <Box sx={{ pY: 1, borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                         value={tabConversationType}
                         onChange={handleChange}
                         aria-label="basic tabs example"
                    >
                         <Tab label="All" value="ALL" />
                         <Tab label="Single" value="SINGLE" />
                         <Tab label="Group" value="GROUP" />
                    </Tabs>
               </Box>
               <ContactList contacts={contacts} />
          </Stack>
     );
};

export default Contact;
