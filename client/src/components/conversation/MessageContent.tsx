import { useMemo } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import moment, { Moment } from "moment";

import ImageCard from "~/components/conversation/ImageCard";
import LinkCard from "~/components/conversation/LinkCard";
import FileCard from "~/components/conversation/FileCard";
import BaseAvatar from "~/components/ui/BaseAvatar";

import useAppSelector from "~/hooks/useAppSelector";
import { authSelect } from "~/store/slices/authSlice";
import { conversationSelect } from "~/store/slices/conversationSlice";
import { Message } from "~/types";
import { formatMediaMessageContent } from "~/utils/formatter";

const MessageContent = () => {
     const { userInfo } = useAppSelector(authSelect);
     const { currentConversation } = useAppSelector(conversationSelect);

     const renderMessageType = (message: Message, isSender: boolean) => {
          switch (message.messageType) {
               case "IMAGE":
                    return (
                         <ImageMessage message={message} isSender={isSender} />
                    );
               case "LINK":
                    return (
                         <LinkMessage message={message} isSender={isSender} />
                    );
               case "FILE":
                    return (
                         <FileMessage message={message} isSender={isSender} />
                    );
               default:
                    return (
                         <TextMessage message={message} isSender={isSender} />
                    );
          }
     };

     const renderMessages = useMemo(() => {
          let lastDate: string | null = null;
          let lastTime: Moment | null = null;

          return currentConversation?.messages?.map((message) => {
               const isSender = userInfo
                    ? userInfo._id === message.senderId._id
                    : false;

               const messageDate = moment(message.createdAt).format(
                    "YYYY-MM-DD"
               );
               const showDate = messageDate !== lastDate;
               const messageTime = moment(message.createdAt);
               const showAvatar =
                    !lastTime || messageTime.diff(lastTime, "minutes") > 5;

               lastDate = messageDate;
               lastTime = messageTime;

               return (
                    <Box key={message._id}>
                         {showDate && (
                              <Box
                                   sx={{
                                        width: "100%",
                                        margin: "16px 0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                   }}
                              >
                                   <Box
                                        sx={{
                                             display: "flex",
                                             alignItems: "center",
                                             width: "50%",
                                        }}
                                   >
                                        <Divider sx={{ flexGrow: 1 }} />
                                        <Typography
                                             variant="body2"
                                             sx={{
                                                  margin: "0 8px",
                                                  color: "text.secondary",
                                             }}
                                        >
                                             {moment(message.createdAt).format(
                                                  "DD MMM YYYY"
                                             )}
                                        </Typography>
                                        <Divider sx={{ flexGrow: 1 }} />
                                   </Box>
                              </Box>
                         )}
                         <Box
                              sx={{
                                   display: "flex",
                                   gap: "4px",
                                   justifyContent: `${
                                        isSender ? "flex-end" : "flex-start"
                                   }`,
                                   marginTop: `${showAvatar ? "10px" : "2px"}`,
                              }}
                         >
                              {!isSender && showAvatar && (
                                   <BaseAvatar
                                        src={message.senderId.avatar}
                                        sx={{ width: 30, height: 30 }}
                                   />
                              )}
                              <Box
                                   sx={{
                                        maxWidth: "60%",
                                        paddingLeft: `${
                                             showAvatar ? "0" : "34px"
                                        }`,
                                   }}
                              >
                                   {renderMessageType(message, isSender)}
                              </Box>
                         </Box>
                    </Box>
               );
          });
     }, [currentConversation, userInfo]);

     return (
          <Stack
               sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
               }}
          >
               {renderMessages}
          </Stack>
     );
};

interface MessageContentProps {
     message: Message;
     isSender: boolean;
}

const TextMessage: React.FC<MessageContentProps> = ({ message, isSender }) => {
     return (
          <Typography
               variant="body2"
               sx={{
                    backgroundColor: `${
                         isSender ? "primary.main" : "background.paperChannel"
                    }`,
                    padding: "10px 16px",
                    borderRadius: 4,
               }}
          >
               {message.messageContent}
          </Typography>
     );
};

const ImageMessage: React.FC<MessageContentProps> = ({ message }) => {
     return (
          <Box>
               <ImageCard
                    src={message.messageContent}
                    alt={message.messageContent}
                    style={{
                         borderRadius: 12,
                         width: "100%",
                         cursor: "pointer",
                    }}
               />
          </Box>
     );
};

const LinkMessage: React.FC<MessageContentProps> = ({ message, isSender }) => {
     return (
          <Box>
               <LinkCard
                    content={message.messageContent}
                    sx={{
                         backgroundColor: `${
                              isSender
                                   ? "primary.main"
                                   : "background.paperChannel"
                         }`,
                    }}
               />
          </Box>
     );
};

const FileMessage: React.FC<MessageContentProps> = ({ message, isSender }) => {
     return (
          <Box>
               <FileCard
                    content={formatMediaMessageContent(
                         message.fileType,
                         message.messageContent
                    )}
                    fileType={message.fileType}
                    sx={{
                         backgroundColor: `${
                              isSender
                                   ? "primary.main"
                                   : "background.paperChannel"
                         }`,
                    }}
               />
          </Box>
     );
};

export default MessageContent;
