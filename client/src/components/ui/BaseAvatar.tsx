import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { SERVER_BASE_URL } from "~/utils/constants";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

interface BaseAvatarProps {
  src?: string;
  alt?: string;
  isOnline?: boolean;
  sx?: SxProps<Theme>;
}

const BaseAvatar: React.FC<BaseAvatarProps> = ({
  src,
  alt,
  isOnline,
  sx,
  ...props
}) => {
  return (
    <>
      {isOnline ? (
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            alt={alt || ""}
            src={src ? `${SERVER_BASE_URL}/${src}` : ""}
            sx={{
              width: 50,
              height: 50,
              ...sx,
            }}
            {...props}
          />
        </StyledBadge>
      ) : (
        <Avatar
          alt={alt || ""}
          src={src ? `${SERVER_BASE_URL}/${src}` : ""}
          sx={{
            width: 50,
            height: 50,
            ...sx,
          }}
          {...props}
        />
      )}
    </>
  );
};

export default BaseAvatar;
