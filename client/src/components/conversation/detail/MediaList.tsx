import { Stack } from "@mui/material";
import LinkCard from "./LinkCard";
import FileCard from "./FileCard";
import { formatMediaMessageContent } from "~/utils/formatter";

interface MediaListProps {
     media: any;
     maxItems?: number;
}

const MediaList: React.FC<MediaListProps> = ({ media, maxItems }) => {
     return (
          <Stack gap={1} py={1}>
               {media.messages?.slice(0, maxItems).map((mediaItem: any) => {
                    const content = formatMediaMessageContent(
                         mediaItem.messageType,
                         mediaItem.messageContent
                    );

                    return mediaItem.messageType === "LINK" ? (
                         <LinkCard key={mediaItem._id} content={content} />
                    ) : (
                         <FileCard
                              key={mediaItem._id}
                              content={content}
                              fileType={mediaItem.fileType}
                         />
                    );
               })}
          </Stack>
     );
};

export default MediaList;
