import { useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import { FolderZip, Link as LinkIcon } from "@mui/icons-material";

import { useSocket } from "~/context/SocketContext";
import useAppSelector from "~/hooks/useAppSelector";
import { authSelect } from "~/store/slices/authSlice";
import { conversationSelect } from "~/store/slices/conversationSlice";
import UserInfo from "~/components/conversation/UserInfo";
import ContentGroup from "~/components/conversation/detail/ContentGroup";

const ConversationDetail = () => {
  const socket = useSocket();
  const { userInfo } = useAppSelector(authSelect);
  const { chatDetail } = useAppSelector(conversationSelect);

  useEffect(() => {
    if (socket && userInfo) {
      socket.emit("getConversationDetail", {
        conversationId: "66a1fe3de8dbfe58599be9c8",
        userId: userInfo._id,
      });
    }
  }, [socket, userInfo]);

  const renderedChatDetail = useMemo(() => {
    return chatDetail?.map((message) => {
      switch (message.messageType) {
        case "IMAGE":
          return (
            <ContentGroup
              key={message.messageType}
              message={message}
              title="Photos and Video"
              maxItems={2}
            />
          );
        case "FILE":
          return (
            <ContentGroup
              key={message.messageType}
              message={message}
              title="Shareds Files"
              icon={<FolderZip />}
              maxItems={2}
            />
          );
        case "LINK":
          return (
            <ContentGroup
              key={message.messageType}
              message={message}
              title="Shareds Links"
              icon={<LinkIcon />}
              maxItems={2}
            />
          );
        default:
          return null;
      }
    });
  }, [chatDetail]);

  return (
    <Stack
      width={(theme) => theme.chatCustom.chatDetailWidth}
      gap={1}
      sx={{
        padding: 3,
        height: "100vh",
        overflowY: "scroll",
        scrollbarWidth: "none",
      }}
    >
      <UserInfo />
      {renderedChatDetail}
    </Stack>
  );
};

export default ConversationDetail;
