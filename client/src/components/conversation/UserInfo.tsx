import { Box, Typography } from "@mui/material";
import BaseAvatar from "../ui/BaseAvatar";
import useAppSelector from "~/hooks/useAppSelector";
import { conversationSelect } from "~/store/slices/conversationSlice";

const UserInfo = ({}) => {
     const { selectedContact } = useAppSelector(conversationSelect);

     return (
          <Box
               sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "4px",
               }}
               py={1}
          >
               <BaseAvatar
                    src={selectedContact?.avatar}
                    alt={selectedContact?.firstname}
                    sx={{ height: 100, width: 100 }}
                    isOnline={selectedContact?.isOnline}
               />
               <Typography variant="h5" sx={{ color: "primary.main" }}>
                    {selectedContact?.firstname} {selectedContact?.lastname}
               </Typography>
               <Typography variant="body2" sx={{ color: "text.main" }}>
                    {selectedContact?.email}
               </Typography>
          </Box>
     );
};

export default UserInfo;
