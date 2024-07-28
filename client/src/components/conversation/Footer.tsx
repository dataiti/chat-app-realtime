import { useState, KeyboardEvent, ChangeEvent } from "react";
import EmojiPicker, { Theme } from "emoji-picker-react";
import {
     EmojiEmotions,
     Send,
     AttachFile,
     KeyboardVoice,
     Cancel,
} from "@mui/icons-material";
import {
     Box,
     IconButton,
     InputAdornment,
     Stack,
     TextField,
     Typography,
} from "@mui/material";

import FileCard from "~/components/conversation/FileCard";

import useClickOutside from "~/hooks/useClickOutSide";
import useAppSelector from "~/hooks/useAppSelector";

import { conversationSelect } from "~/store/slices/conversationSlice";
import { authSelect } from "~/store/slices/authSlice";
import { useSocket } from "~/context/SocketContext";
import { getFileType, getMessageType } from "~/utils/formatter";
import { FileMessage, ImageMessage } from "~/types";
import { uploadFileMessageService } from "~/services/messageService";

const Footer = () => {
     const socket = useSocket();
     const { userInfo } = useAppSelector(authSelect);
     const { selectedContact } = useAppSelector(conversationSelect);
     const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);
     const [messageValue, setMessageValue] = useState<string>("");
     const [selectedFile, setSelectedFile] = useState<File | null>(null);
     const [imageMessage, setImageMessage] = useState<ImageMessage | null>(
          null
     );
     const [fileMessage, setFileMessage] = useState<FileMessage | null>(null);

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
          try {
               let fileDataResponse;

               if (selectedFile) {
                    const formData = new FormData();
                    formData.append("file", selectedFile);

                    const response = await uploadFileMessageService(formData);

                    if (response.status === 200) {
                         fileDataResponse = response.data.data;
                         setImageMessage(null);
                         setFileMessage(null);
                         setSelectedFile(null);
                    }
               }

               if (socket && (messageValue || selectedFile)) {
                    socket.emit("sendMessage", {
                         senderId: userInfo?._id,
                         recepientId: selectedContact?._id,
                         messageContent: fileDataResponse
                              ? fileDataResponse
                              : messageValue,
                    });
               }

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

     const handleUnSelectFile = () => {
          setSelectedFile(null);
          setFileMessage(null);
          setImageMessage(null);
     };

     const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
          const file = event.target.files?.[0];

          if (file) {
               setSelectedFile(file);

               if (getMessageType(file.name) === "IMAGE") {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                         setImageMessage({
                              src: reader.result as string,
                              alt: file.name,
                         });
                    };
                    reader.readAsDataURL(file);
                    setFileMessage(null);
               } else {
                    setFileMessage({
                         name: file.name,
                         type: getFileType(file.type),
                    });
                    setImageMessage(null);
               }
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
                    <IconButton color="primary" component="label">
                         <AttachFile />
                         <input
                              id="upload-file"
                              type="file"
                              hidden
                              onChange={handleSelectFile}
                         />
                    </IconButton>
               </Box>
               <Box>
                    <IconButton color="primary">
                         <KeyboardVoice />
                    </IconButton>
               </Box>
               <Box
                    sx={{
                         position: "relative",
                         flex: 1,
                    }}
               >
                    {imageMessage && (
                         <Box
                              sx={{
                                   position: "absolute",
                                   bottom: "100%",
                                   display: "flex",
                                   flexDirection: "column",
                                   borderRadius: 4,
                                   overflow: "hidden",
                                   marginBottom: 1,
                              }}
                         >
                              <img
                                   src={imageMessage.src}
                                   alt={imageMessage.alt}
                                   width={150}
                              />
                              <Typography
                                   sx={{
                                        textAlign: "center",
                                        py: 1,
                                        backgroundColor: "primary.main",
                                   }}
                                   variant="body2"
                              >
                                   {imageMessage.alt}
                              </Typography>
                              <IconButton
                                   sx={{
                                        position: "absolute",
                                        left: 1,
                                        top: 1,
                                   }}
                                   onClick={handleUnSelectFile}
                              >
                                   <Cancel />
                              </IconButton>
                         </Box>
                    )}
                    {fileMessage && (
                         <Box
                              sx={{
                                   position: "absolute",
                                   bottom: "100%",
                                   marginBottom: 1,
                              }}
                         >
                              <FileCard
                                   content={fileMessage.name}
                                   fileType={fileMessage.type}
                                   sx={{ paddingLeft: 4 }}
                              />
                              <IconButton
                                   sx={{
                                        position: "absolute",
                                        left: 1,
                                        top: 1,
                                   }}
                                   onClick={handleUnSelectFile}
                              >
                                   <Cancel />
                              </IconButton>
                         </Box>
                    )}
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
               </Box>
               <Box>
                    <IconButton
                         sx={{
                              backgroundColor: "primary.main",
                              borderRadius: 3,
                              width: "100%",
                              height: "100%",
                         }}
                         size="large"
                         // disabled={!messageValue}
                         onClick={handleClickSendMessage}
                    >
                         <Send />
                    </IconButton>
               </Box>
          </Stack>
     );
};

export default Footer;
