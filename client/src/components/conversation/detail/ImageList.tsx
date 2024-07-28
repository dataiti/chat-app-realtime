import { memo } from "react";
import { ImageList as MuiImageList, ImageListItem } from "@mui/material";

import ImageCard from "../ImageCard";

interface ImageListProps {
     media: any;
     maxItems?: number;
}

const ImageList: React.FC<ImageListProps> = ({ media, maxItems }) => {
     return (
          <MuiImageList
               sx={{
                    width: "100%",
               }}
               cols={3}
          >
               {media.messages?.slice(0, maxItems).map((mediaItem: any) => (
                    <ImageListItem key={mediaItem._id}>
                         <ImageCard
                              src={mediaItem.messageContent}
                              alt={mediaItem.messageContent}
                         />
                    </ImageListItem>
               ))}
          </MuiImageList>
     );
};

export default memo(ImageList);
