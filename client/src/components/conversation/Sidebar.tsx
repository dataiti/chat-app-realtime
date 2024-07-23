import { DarkMode, LightMode, Logout, Message } from "@mui/icons-material";
import { Avatar, IconButton, useColorScheme } from "@mui/material";
import Stack from "@mui/material/Stack";

const Sidebar = () => {
  const { mode, setMode } = useColorScheme();

  const handleLogout = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      height="100vh"
      direction="column"
      alignItems="center"
      justifyContent="space-between"
      paddingY={3}
    >
      <Stack direction="column" alignItems="center" gap={2}>
        <IconButton>
          <Message />
        </IconButton>
      </Stack>
      <Stack direction="column" alignItems="center" gap={2}>
        <IconButton
          onClick={() => {
            setMode(mode === "light" ? "dark" : "light");
          }}
        >
          {mode === "light" ? <DarkMode /> : <LightMode />}
        </IconButton>
        <IconButton onClick={handleLogout}>
          <Logout />
        </IconButton>
        <Avatar src="" alt="" sx={{ cursor: "pointer" }} />
      </Stack>
    </Stack>
  );
};

export default Sidebar;
