import { Box, SxProps, Theme } from "@mui/material";
import { memo, useState } from "react";
import BaseModal from "~/components/ui/BaseModal";
import { SERVER_BASE_URL } from "~/utils/constants";

interface ImageCardProps {
     src: string;
     alt: string;
     sx?: SxProps<Theme>;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, sx }) => {
     const [openImage, setOpenImage] = useState(false);

     const handleOpen = () => setOpenImage(true);

     return (
          <>
               <Box
                    component="img"
                    srcSet={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format&dpr=2 2x`}
                    src={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format`}
                    alt={alt}
                    loading="lazy"
                    sx={{
                         borderRadius: 4,
                         height: 90,
                         width: 90,
                         cursor: "pointer",
                         objectFit: "cover",
                         ...sx,
                    }}
                    onClick={handleOpen}
               />
               <BaseModal open={openImage} onOpen={setOpenImage}>
                    <Box
                         component="img"
                         srcSet={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format&dpr=2 2x`}
                         src={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format`}
                         alt={alt}
                         loading="lazy"
                         sx={{
                              borderRadius: 4,
                              height: "535px",
                              cursor: "pointer",
                         }}
                    />
               </BaseModal>
          </>
     );
};

export default memo(ImageCard);
