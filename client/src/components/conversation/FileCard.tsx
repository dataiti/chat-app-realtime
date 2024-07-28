import { Box, Typography } from "@mui/material";
import { FolderZip, TextSnippet } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { memo } from "react";

interface FileCardProps {
     content: string | undefined;
     fileType: string | undefined;
     sx?: SxProps<Theme>;
}

const FileCard: React.FC<FileCardProps> = ({ content, fileType, sx }) => {
     const handleDownloadFile = () => {};

     return (
          <Box
               sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    backgroundColor: "background.paperChannel",
                    borderRadius: 4,
                    cursor: "pointer",
                    ...sx,
               }}
          >
               <Box
                    sx={{
                         display: "flex",
                         alignItems: "center",
                         gap: 1,
                         borderRadius: 4,
                         padding: 1,
                         cursor: "pointer",
                    }}
               >
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
                         {fileType === "DOC" ? <TextSnippet /> : <FolderZip />}
                    </Box>
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
                         {content}
                    </Typography>
               </Box>
          </Box>
     );
};

export default memo(FileCard);
