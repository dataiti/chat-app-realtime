import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import Sidebar from "~/components/conversation/Sidebar";

const DashboardLayout = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{ height: "100vh", backgroundColor: "background.default" }}
    >
      <Stack direction="row" height="100%">
        <Box
          sx={{
            width: (theme) => theme.chatCustom.sidebarWidth,
            height: "100%",
            backgroundColor: "background.default",
            color: "text.primary",
          }}
        >
          <Sidebar />
        </Box>
        <Box sx={{ height: "100%", flex: 1 }}>
          <Outlet />
        </Box>
      </Stack>
    </Container>
  );
};

export default DashboardLayout;
