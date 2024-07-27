import { Box, Stack, Tab, Tabs } from "@mui/material";

import ContactList from "~/components/conversation/contacts/ContactList";
import SearchBar from "./SearchBar";
import useAppSelector from "~/hooks/useAppSelector";
import { conversationSelect } from "~/store/slices/conversationSlice";
import { useEffect, useState } from "react";
import { useSocket } from "~/context/SocketContext";
import { authSelect } from "~/store/slices/authSlice";
import BaseTabPanel from "~/components/ui/BaseTabPanel";

const Contact = () => {
     const socket = useSocket();
     const { userInfo } = useAppSelector(authSelect);
     const { contacts } = useAppSelector(conversationSelect);

     const [tabValue, setTabValue] = useState<string | null>("SINGLE");

     const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
          setTabValue(newValue);
     };

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
               <Box sx={{ pY: 1, borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                         value={tabValue}
                         onChange={handleChange}
                         aria-label="basic tabs example"
                    >
                         <Tab label="All" value="ALL" />
                         <Tab label="Single" value="SINGLE" />
                         <Tab label="Group" value="GROUP" />
                    </Tabs>
               </Box>
               <BaseTabPanel value={tabValue} index="SINGLE">
                    <ContactList contacts={contacts} />
               </BaseTabPanel>
          </Stack>
     );
};

export default Contact;
