import { Stack } from "@mui/material";
import Contact from "~/components/conversation/Contact";
import Conversation from "~/components/conversation/Conversation";
import useAppSelector from "~/hooks/useAppSelector";
import { selectApp } from "~/store/slices/appSlice";

const ChatPage = () => {
  const { openChatDetail } = useAppSelector(selectApp);

  return (
    <Stack
      direction="row"
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 6,
        width: (theme) =>
          openChatDetail
            ? `calc(100% - ${theme.chatCustom.chatDetailWidth})`
            : "100%",
        height: "100%",
        transition: "ease-in-out",
      }}
    >
      <Contact />
      <Conversation />
    </Stack>
  );
};

export default ChatPage;
