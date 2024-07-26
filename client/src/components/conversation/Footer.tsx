import { useState, KeyboardEvent } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
     EmojiEmotions,
     Send,
     AttachFile,
     KeyboardVoice,
} from "@mui/icons-material";
import {
     Box,
     IconButton,
     InputAdornment,
     Stack,
     TextField,
} from "@mui/material";

import useClickOutside from "~/hooks/useClickOutSide";
import useAppSelector from "~/hooks/useAppSelector";

import { conversationSelect } from "~/store/slices/conversationSlice";
import { authSelect } from "~/store/slices/authSlice";
import { useSocket } from "~/context/SocketContext";

const Footer = () => {
     const socket = useSocket();
     const { userInfo } = useAppSelector(authSelect);
     const { selectedContact } = useAppSelector(conversationSelect);
     const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);
     const [messageValue, setMessageValue] = useState<string>("");

     const handleClickOutside = () => {
          setEmojiPickerOpen(false);
     };

     const emojiRef = useClickOutside(handleClickOutside);

     const handleAddEmoji = (emoji: { emoji: string }) => {
          if (emoji) {
               setMessageValue((message) => message + emoji.emoji);
          }
     };

     const sendMessage = async () => {
          if (!messageValue || !socket) return;

          try {
               socket.emit("sendMessage", {
                    senderId: userInfo?._id,
                    recepientId: selectedContact?._id,
                    messageContent: messageValue,
               });

               setMessageValue("");
          } catch (error) {
               console.log(error);
          }
     };

     const handleClickSendMessage = () => {
          sendMessage();
     };

     const handleEnterMessage = (event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
               sendMessage();
          }
     };

     return (
          <Stack
               direction="row"
               alignItems="center"
               gap={1}
               sx={{
                    width: "100%",
                    padding: 2,
               }}
          >
               <Box>
                    <IconButton color="primary">
                         <AttachFile />
                    </IconButton>
               </Box>
               <Box>
                    <IconButton color="primary">
                         <KeyboardVoice />
                    </IconButton>
               </Box>
               <TextField
                    placeholder="Enter message"
                    fullWidth
                    size="medium"
                    spellCheck={false}
                    value={messageValue}
                    onChange={(e) => setMessageValue(e.target.value)}
                    onKeyDown={handleEnterMessage}
                    InputProps={{
                         endAdornment: (
                              <InputAdornment
                                   position="end"
                                   sx={{
                                        position: "relative",
                                        cursor: "pointer",
                                   }}
                                   onClick={() => setEmojiPickerOpen(true)}
                              >
                                   <EmojiEmotions />
                                   <Box
                                        sx={{
                                             position: "absolute",
                                             bottom: "16px",
                                             right: "-50%",
                                        }}
                                        ref={emojiRef}
                                   >
                                        <EmojiPicker
                                             theme={Theme.DARK}
                                             open={emojiPickerOpen}
                                             onEmojiClick={handleAddEmoji}
                                             autoFocusSearch={true}
                                        />
                                   </Box>
                              </InputAdornment>
                         ),
                    }}
                    sx={{
                         backgroundColor: "background.paperChannel",
                         borderRadius: 4,
                    }}
               />
               <Box>
                    <IconButton
                         sx={{
                              backgroundColor: "primary.main",
                              borderRadius: 3,
                              width: "100%",
                              height: "100%",
                         }}
                         size="large"
                         disabled={!messageValue}
                         onClick={handleClickSendMessage}
                    >
                         <Send />
                    </IconButton>
               </Box>
          </Stack>
     );
};

export default Footer;
