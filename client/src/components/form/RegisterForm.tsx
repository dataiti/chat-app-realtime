import { memo } from "react";
import { Box, Button, FormControl, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

import { RegisterFormValues } from "~/types";
import BaseTextFieldController from "~/components/ui/BaseTextFieldController";

interface RegisterFormProps {
     form: UseFormReturn<RegisterFormValues>;
     onSubmitRegister: (data: RegisterFormValues) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
     form,
     onSubmitRegister,
}) => {
     const {
          control,
          handleSubmit,
          formState: { errors, isSubmitting, isValid },
     } = form;

     return (
          <FormControl
               component="form"
               onSubmit={handleSubmit(onSubmitRegister)}
               sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
               <BaseTextFieldController
                    control={control}
                    name="firstname"
                    label="Firstname"
                    placeholder="Enter your firstname"
                    errorMessage={errors?.firstname?.message}
               />
               <BaseTextFieldController
                    control={control}
                    name="lastname"
                    label="Lastname"
                    placeholder="Enter your lastname"
                    errorMessage={errors?.lastname?.message}
               />
               <BaseTextFieldController
                    control={control}
                    name="email"
                    label="Email address"
                    placeholder="Enter your email address"
                    errorMessage={errors?.email?.message}
               />
               <BaseTextFieldController
                    type="password"
                    control={control}
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    errorMessage={errors?.password?.message}
               />
               <Box>
                    <Button
                         type="submit"
                         variant="contained"
                         fullWidth
                         size="large"
                         sx={{ borderRadius: 3, marginTop: 1 }}
                         disabled={!isValid || isSubmitting}
                    >
                         Register
                    </Button>
               </Box>
               <Link to="/login">
                    <Typography variant="body2" textAlign="center">
                         Login Now
                    </Typography>
               </Link>
          </FormControl>
     );
};

export default memo(RegisterForm);
