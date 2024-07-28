import { SxProps, Theme } from "@mui/material";
import { memo, useState } from "react";
import BaseModal from "~/components/ui/BaseModal";
import { SERVER_BASE_URL } from "~/utils/constants";

interface ImageCardProps {
     src: string;
     alt: string;
     style?: SxProps<Theme>;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, style, ...props }) => {
     const [openImage, setOpenImage] = useState(false);

     const handleOpen = () => setOpenImage(true);
     const handleClose = () => setOpenImage(false);

     return (
          <>
               <img
                    srcSet={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format&dpr=2 2x`}
                    src={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format`}
                    alt={alt}
                    loading="lazy"
                    style={{
                         borderRadius: 16,
                         height: 90,
                         width: 90,
                         cursor: "pointer",
                         objectFit: "cover",
                    }}
                    {...props}
                    onClick={handleOpen}
               />
               <BaseModal open={openImage} onClose={handleClose}>
                    <img
                         srcSet={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format&dpr=2 2x`}
                         src={`${SERVER_BASE_URL}/${src}?w=100&h=70&fit=crop&auto=format`}
                         alt={alt}
                         loading="lazy"
                         style={{
                              borderRadius: 16,
                              height: "535px",
                              cursor: "pointer",
                         }}
                         {...props}
                    />
               </BaseModal>
          </>
     );
};

export default memo(ImageCard);
