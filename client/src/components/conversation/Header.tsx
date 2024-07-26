import { Call, MoreVert, Search, ViewSidebar } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import BaseAvatar from "~/components/ui/BaseAvatar";
import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import { toggleOpenChatDetail } from "~/store/slices/appSlice";
import { conversationSelect } from "~/store/slices/conversationSlice";

const Header = () => {
     const dispatch = useAppDispatch();
     const { selectedContact } = useAppSelector(conversationSelect);

     const handleToggleOpenChatDetail = () => {
          dispatch(toggleOpenChatDetail());
     };

     return (
          <Stack
               direction="row"
               justifyContent="space-between"
               sx={{ padding: 2 }}
          >
               <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <BaseAvatar
                         src={selectedContact?.avatar}
                         alt={selectedContact?.firstname}
                         isOnline={selectedContact?.isOnline}
                    />
                    <Box
                         sx={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                         }}
                    >
                         <Typography
                              variant="body1"
                              sx={{ color: "text.primary" }}
                         >
                              {selectedContact?.firstname}{" "}
                              {selectedContact?.lastname}
                         </Typography>
                         <Typography variant="body2">
                              {selectedContact?.isOnline ? "Online" : "Offline"}
                         </Typography>
                    </Box>
               </Box>
               <Stack direction="row" spacing={1}>
                    <IconButton>
                         <Search />
                    </IconButton>
                    <IconButton>
                         <Call />
                    </IconButton>
                    <IconButton onClick={handleToggleOpenChatDetail}>
                         <ViewSidebar />
                    </IconButton>
                    <IconButton>
                         <MoreVert />
                    </IconButton>
               </Stack>
          </Stack>
     );
};

export default Header;
