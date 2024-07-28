import { RemoveRedEye, VisibilityOff } from "@mui/icons-material";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import { memo, useState } from "react";
import { Control, Controller } from "react-hook-form";

interface BaseTextFieldControllerProps {
     control: Control;
     name: string;
     errorMessage?: string;
     label: string;
     type: "text" | "password" | "email";
}

const BaseTextFieldController: React.FC<BaseTextFieldControllerProps> = ({
     control,
     name,
     errorMessage,
     label,
     type,
     ...props
}) => {
     const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

     const toggleShowPassword = () => {
          setIsShowPassword((prev) => !prev);
     };

     return (
          <Controller
               name={name}
               control={control}
               render={({ field }) => (
                    <Box
                         sx={{
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                         }}
                    >
                         <Typography sx={{ color: "primary.main" }}>
                              {label}
                         </Typography>
                         <TextField
                              {...field}
                              type={
                                   type === "password" && isShowPassword
                                        ? "password"
                                        : "text"
                              }
                              fullWidth
                              spellCheck={false}
                              sx={{
                                   backgroundColor: "background.paperChannel",
                                   borderRadius: 4,
                              }}
                              InputProps={{
                                   endAdornment: type === "password" && (
                                        <InputAdornment
                                             position="start"
                                             onClick={toggleShowPassword}
                                             sx={{ cursor: "pointer" }}
                                        >
                                             {isShowPassword ? (
                                                  <RemoveRedEye />
                                             ) : (
                                                  <VisibilityOff />
                                             )}
                                        </InputAdornment>
                                   ),
                              }}
                              {...props}
                         />
                         <Typography
                              sx={{
                                   position: "absolute",
                                   bottom: "-20px",
                                   fontSize: "12px",
                                   color: "red",
                              }}
                         >
                              {errorMessage}
                         </Typography>
                    </Box>
               )}
          />
     );
};

export default memo(BaseTextFieldController);
