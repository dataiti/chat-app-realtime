import { memo } from "react";
import { Box, Button, Typography } from "@mui/material";

import MediaList from "./MediaList";
import ImageList from "./ImageList";
import { MessageGroup } from "~/types";

interface MediaGroupProps {
     media: MessageGroup;
     title: string;
     maxItems: number;
     onSetTabValue: (value: string | null) => void;
}

const MediaGroup: React.FC<MediaGroupProps> = ({
     media,
     title,
     onSetTabValue,
}) => {
     return (
          <Box mb={1}>
               <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
               >
                    <Box display="flex" alignItems="center" gap={1}>
                         <Typography variant="h6" color="primary.main">
                              {title}
                         </Typography>
                         <Typography variant="caption" color="text.secondary">
                              {media.count}
                         </Typography>
                    </Box>
                    <Button
                         size="small"
                         sx={{
                              fontSize: 12,
                              color: "text.secondary",
                              padding: "0",
                         }}
                         onClick={() => onSetTabValue(media.messageType)}
                    >
                         See all
                    </Button>
               </Box>
               {media.messageType === "IMAGE" ? (
                    <ImageList media={media} maxItems={3} />
               ) : (
                    <MediaList media={media} maxItems={2} />
               )}
          </Box>
     );
};
export default memo(MediaGroup);
