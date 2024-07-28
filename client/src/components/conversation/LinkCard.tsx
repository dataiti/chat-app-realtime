import { Box, Typography, Link } from "@mui/material";
import { Link as LinkIcon } from "@mui/icons-material";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { memo } from "react";

interface LinkCardProps {
     content: string | undefined;
     sx?: SxProps<Theme>;
}

const LinkCard: React.FC<LinkCardProps> = ({ content, sx }) => {
     return (
          <Link href={content} target="_blank" underline="none">
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
                              <LinkIcon />
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
                                   mb: 1,
                              }}
                              variant="body2"
                         >
                              {content}
                         </Typography>
                    </Box>
               </Box>
          </Link>
     );
};

export default memo(LinkCard);
