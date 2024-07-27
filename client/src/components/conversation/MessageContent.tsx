import { Box, Stack, Typography } from "@mui/material";
import useAppSelector from "~/hooks/useAppSelector";
import { authSelect } from "~/store/slices/authSlice";
import { conversationSelect } from "~/store/slices/conversationSlice";
import { Message } from "~/types";
import ImageCard from "./detail/ImageCard";
import LinkCard from "./detail/LinkCard";
import FileCard from "./detail/FileCard";
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

     return (
          <Stack
               sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
               }}
          >
               {currentConversation?.messages?.map((message) => {
                    const isSender = userInfo
                         ? userInfo._id === message.senderId._id
                         : false;

                    return (
                         <Box
                              key={message._id}
                              sx={{
                                   display: "flex",
                                   justifyContent: `${
                                        isSender ? "flex-end" : "flex-start"
                                   } `,
                              }}
                         >
                              <Box sx={{ maxWidth: "60%" }}>
                                   {renderMessageType(message, isSender)}
                              </Box>
                         </Box>
                    );
               })}
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
               sx={{
                    backgroundColor: `${
                         isSender ? "primary.main" : "background.paperChannel"
                    }`,
                    padding: "12px 16px",
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
                         borderRadius: 16,
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
