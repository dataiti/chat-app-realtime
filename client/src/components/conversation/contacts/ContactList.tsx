import { Stack } from "@mui/material";

import ContactItem from "./ContactItem";
import { ContactItemType } from "~/types";

interface ContactListProps {
     contacts: ContactItemType[];
     selectedContact: ContactItemType | null;
     onSelectedContact: (contact: ContactItemType) => void;
}

const ContactList: React.FC<ContactListProps> = ({
     contacts,
     selectedContact,
     onSelectedContact,
}) => {
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
                              selectedContact={selectedContact}
                              onSelectedContact={onSelectedContact}
                         />
                    ))}
          </Stack>
     );
};

export default ContactList;
