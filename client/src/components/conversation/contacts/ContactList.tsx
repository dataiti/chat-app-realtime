import { memo } from "react";
import { Stack } from "@mui/material";

import ContactItem from "./ContactItem";
import { Contact } from "~/types";

interface ContactListProps {
     contacts: Contact[];
}

const ContactList: React.FC<ContactListProps> = ({ contacts }) => {
     return (
          <Stack
               direction="column"
               sx={{
                    height: "calc(40vh)",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
                    gap: 1,
               }}
          >
               {contacts.length > 0 &&
                    contacts.map((contactItem) => (
                         <ContactItem
                              key={contactItem._id}
                              contactItem={contactItem}
                         />
                    ))}
          </Stack>
     );
};

export default memo(ContactList);
