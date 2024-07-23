import { Box, Typography } from "@mui/material";
import { ContactItemType, ContactItemProps } from "~/types/types";
import BaseAvatar from "../ui/BaseAvatar";

const ContactItem: React.FC<ContactItemProps> = ({
  contactItem,
  selectedContact,
  onSelectedContact,
}) => {
  const handleSelectContact = (contactItem: ContactItemType) => {
    onSelectedContact(contactItem);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        backgroundColor:
          selectedContact?._id === contactItem._id
            ? "primary.main"
            : "background.paperChannel",
        cursor: "pointer",
        borderRadius: 5,
        padding: 2,
      }}
      onClick={() => handleSelectContact(contactItem)}
    >
      <BaseAvatar
        src={contactItem.avatar}
        alt={contactItem.firstName}
        isOnline={contactItem.isOnline}
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
                selectedContact?._id === contactItem._id
                  ? "#fff"
                  : "text.primary",
            }}
          >
            {contactItem.firstName} {contactItem.lastName}
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
            {contactItem.lastMessage}
          </Typography>
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedContact?._id === contactItem._id
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
