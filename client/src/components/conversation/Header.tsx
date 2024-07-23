import { ViewSidebar } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import BaseAvatar from "~/components/ui/BaseAvatar";
import useAppDispatch from "~/hooks/useAppDispatch";
import { toggleOpenChatDetail } from "~/store/slices/appSlice";

const Header = () => {
  const dispatch = useAppDispatch();

  const handleToggleOpenChatDetail = () => {
    dispatch(toggleOpenChatDetail());
  };

  return (
    <Stack direction="row" justifyContent="space-between" sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <BaseAvatar isOnline />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            Nguyễn Đạt
          </Typography>
          <Typography variant="body2">Đang hoạt động</Typography>
        </Box>
      </Box>
      <Box>
        <IconButton onClick={handleToggleOpenChatDetail}>
          <ViewSidebar />
        </IconButton>
      </Box>
    </Stack>
  );
};

export default Header;
