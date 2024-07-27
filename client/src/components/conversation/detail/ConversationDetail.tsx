import { useEffect, useMemo, useState } from "react";
import { Box, IconButton, Stack, Tab, Tabs, Typography } from "@mui/material";
import { ArrowBack, Cancel } from "@mui/icons-material";

import UserInfo from "~/components/conversation/UserInfo";
import MediaGroup from "~/components/conversation/detail/MediaGroup";
import BaseTabPanel from "~/components/ui/BaseTabPanel";
import MediaList from "~/components/conversation/detail/MediaList";
import ImageList from "~/components/conversation/detail/ImageList";

import useAppSelector from "~/hooks/useAppSelector";
import useAppDispatch from "~/hooks/useAppDispatch";

import { conversationSelect } from "~/store/slices/conversationSlice";
import { toggleOpenChatDetail } from "~/store/slices/appSlice";

const ConversationDetail = () => {
     const dispatch = useAppDispatch();
     const { selectedContact, chatDetail } = useAppSelector(conversationSelect);

     const [tabValue, setTabValue] = useState<string | null>(null);

     const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
          setTabValue(newValue);
     };

     const handleCloseChatDetail = () => {
          dispatch(toggleOpenChatDetail());
     };

     const renderedChatDetail = useMemo(() => {
          return chatDetail?.map((media) => {
               switch (media.messageType) {
                    case "IMAGE":
                         return (
                              <MediaGroup
                                   key={media.messageType}
                                   media={media}
                                   title="Photos and Video"
                                   maxItems={2}
                                   onSetTabValue={setTabValue}
                              />
                         );
                    case "FILE":
                         return (
                              <MediaGroup
                                   key={media.messageType}
                                   media={media}
                                   title="Shareds Files"
                                   maxItems={2}
                                   onSetTabValue={setTabValue}
                              />
                         );
                    case "LINK":
                         return (
                              <MediaGroup
                                   key={media.messageType}
                                   media={media}
                                   title="Shareds Links"
                                   maxItems={2}
                                   onSetTabValue={setTabValue}
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
                    padding: "12px 24px",
                    height: "100vh",
                    overflowY: "scroll",
                    scrollbarWidth: "none",
               }}
          >
               <Box
                    sx={{
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "space-between",
                    }}
               >
                    <Typography variant="h6" color="primary.main">
                         Chat Details
                    </Typography>
                    {tabValue ? (
                         <IconButton onClick={() => setTabValue(null)}>
                              <ArrowBack />
                         </IconButton>
                    ) : (
                         <IconButton onClick={handleCloseChatDetail}>
                              <Cancel />
                         </IconButton>
                    )}
               </Box>

               {!tabValue && (
                    <Box>
                         {selectedContact && <UserInfo />}
                         {renderedChatDetail}
                    </Box>
               )}

               {tabValue && (
                    <Box>
                         <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                              <Tabs
                                   value={tabValue}
                                   onChange={handleChange}
                                   aria-label="basic tabs example"
                              >
                                   <Tab label="Images" value="IMAGE" />
                                   <Tab label="Files" value="FILE" />
                                   <Tab label="Links" value="LINK" />
                              </Tabs>
                         </Box>
                         {chatDetail.map((media) => {
                              switch (media.messageType) {
                                   case "IMAGE":
                                        return (
                                             <BaseTabPanel
                                                  value={tabValue}
                                                  index="IMAGE"
                                             >
                                                  <ImageList media={media} />
                                             </BaseTabPanel>
                                        );
                                   case "FILE":
                                        return (
                                             <BaseTabPanel
                                                  value={tabValue}
                                                  index="FILE"
                                             >
                                                  <MediaList media={media} />
                                             </BaseTabPanel>
                                        );
                                   case "LINK":
                                        return (
                                             <BaseTabPanel
                                                  value={tabValue}
                                                  index="LINK"
                                             >
                                                  <MediaList media={media} />
                                             </BaseTabPanel>
                                        );
                              }
                         })}
                    </Box>
               )}
          </Stack>
     );
};

export default ConversationDetail;
