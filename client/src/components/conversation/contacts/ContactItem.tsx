import { Box, Typography } from "@mui/material";

import BaseAvatar from "~/components/ui/BaseAvatar";
import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import {
     conversationSelect,
     selectContact,
} from "~/store/slices/conversationSlice";
import { Contact } from "~/types";

interface ContactItemProps {
     contactItem: Contact;
}

const ContactItem: React.FC<ContactItemProps> = ({ contactItem }) => {
     const dispatch = useAppDispatch();
     const { selectedContact } = useAppSelector(conversationSelect);

     const handleSelectContact = (contactItem: Contact) => {
          dispatch(selectContact(contactItem.userContact));
     };

     return (
          <Box
               sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    backgroundColor:
                         selectedContact?._id === contactItem.userContact._id
                              ? "primary.main"
                              : "background.paperChannel",
                    cursor: "pointer",
                    borderRadius: 5,
                    padding: 2,
               }}
               onClick={() => handleSelectContact(contactItem)}
          >
               <BaseAvatar
                    src={contactItem.userContact.avatar}
                    alt={contactItem.userContact.firstname}
                    isOnline={contactItem.userContact.isOnline}
               />
               <Box sx={{ width: "100%" }}>
                    <Box
                         sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                         }}
                    >
                         <Typography
                              variant="body1"
                              sx={{
                                   color:
                                        selectedContact?._id ===
                                        contactItem.userContact._id
                                             ? "#fff"
                                             : "text.primary",
                              }}
                         >
                              {contactItem.userContact.firstname}{" "}
                              {contactItem.userContact.lastname}
                         </Typography>
                         <Typography variant="body2">4m</Typography>
                    </Box>
                    <Box
                         sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "space-between",
                              marginTop: "2px",
                         }}
                    >
                         <Typography
                              variant="body2"
                              sx={{
                                   width: (theme) =>
                                        `calc(${theme.chatCustom.contactWidth} - 170px)`,
                                   color: "text.secondary",
                                   overflow: "hidden",
                                   textOverflow: "ellipsis",
                                   whiteSpace: "nowrap",
                              }}
                         >
                              {contactItem.lastMessage.messageContent}
                         </Typography>
                         <Box
                              component="span"
                              sx={{
                                   display: "flex",
                                   alignItems: "center",
                                   justifyContent: "center",
                                   backgroundColor:
                                        selectedContact?._id ===
                                        contactItem.userContact._id
                                             ? "background.paper"
                                             : "primary.main",
                                   width: "24px",
                                   height: "24px",
                                   borderRadius: "50%",
                                   fontSize: "12px",
                              }}
                         >
                              4
                         </Box>
                    </Box>
               </Box>
          </Box>
     );
};

export default ContactItem;
