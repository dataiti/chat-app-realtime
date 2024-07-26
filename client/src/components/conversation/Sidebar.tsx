import { DarkMode, LightMode, Logout, Message } from "@mui/icons-material";
import { IconButton, useColorScheme } from "@mui/material";
import Stack from "@mui/material/Stack";

import BaseAvatar from "~/components/ui/BaseAvatar";
import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import { authSelect, logout } from "~/store/slices/authSlice";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(authSelect);
  const { mode, setMode } = useColorScheme();

  const handleLogout = () => {
    dispatch(logout());
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
        <BaseAvatar
          src={userInfo?.avatar}
          alt={`${userInfo?.firstname} ${userInfo?.lastname}`}
          isOnline={userInfo?.isOnline}
        />
      </Stack>
    </Stack>
  );
};

export default Sidebar;
