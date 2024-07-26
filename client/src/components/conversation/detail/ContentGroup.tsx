import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import { SERVER_BASE_URL } from "~/utils/constants";
import { MessageGroup } from "~/types/types";
import { Link } from "react-router-dom";

interface GroupProps {
  message: MessageGroup;
  title: string;
  icon?: JSX.Element;
  maxItems: number;
}

const ContentGroup = ({ message, title, icon, maxItems }: GroupProps) => {
  return (
    <Box mb={1}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={1}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" color="primary.main">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {message.count}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary">
          See all
        </Typography>
      </Box>
      {message.messageType === "IMAGE" ? (
        <ImageList
          sx={{
            width: "100%",
            height: 100,
          }}
          cols={2}
        >
          {message.messages?.slice(0, maxItems).map((file) => (
            <ImageListItem key={file._id} sx={{ borderRadius: 3 }}>
              <img
                srcSet={`${SERVER_BASE_URL}/${file.messageContent}?w=100&h=70&fit=crop&auto=format&dpr=2 2x`}
                src={`${SERVER_BASE_URL}/${file.messageContent}?w=100&h=70&fit=crop&auto=format`}
                alt={file.messageContent}
                loading="lazy"
                style={{ borderRadius: 16, height: 100 }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      ) : (
        <Stack gap={1}>
          {message.messages?.slice(0, maxItems).map((file) => (
            <Box
              key={file._id}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
                backgroundColor: "background.paperChannel",
                borderRadius: 4,
                cursor: "pointer",
              }}
              component={file.messageType === "LINK" ? "a" : "div"}
              href={
                file.messageType === "LINK" ? file.messageContent : undefined
              }
              target={file.messageType === "LINK" ? "_blank" : undefined}
              rel={
                file.messageType === "LINK" ? "noopener noreferrer" : undefined
              }
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  backgroundColor: "background.paperChannel",
                  borderRadius: 4,
                  padding: 1,
                  cursor: "pointer",
                }}
              >
                {icon && (
                  <Box
                    sx={{
                      flex: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "background.paper",
                      height: 44,
                      width: 44,
                      borderRadius: 3,
                      color: "text.secondary",
                    }}
                  >
                    {icon}
                  </Box>
                )}
                <Typography
                  sx={{
                    width: (theme) =>
                      `calc(${theme.chatCustom.chatDetailWidth} - 116px)`,
                    textWrap: "wrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "text.primary",
                    textDecoration: "none",
                    mb: 1,
                  }}
                  variant="body2"
                >
                  {file.messageType === "LINK"
                    ? file.messageContent
                    : file.messageContent.split("/").pop()}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      )}
    </Box>
  );
};
export default ContentGroup;
