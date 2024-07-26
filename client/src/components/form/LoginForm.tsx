import { Box, Button, FormControl, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";

import BaseInputController from "~/components/ui/BaseInpuController";
import { LoginFormValues } from "~/types";

interface LoginFormProps {
     form: UseFormReturn<LoginFormValues>;
     onSubmitLogin: (data: LoginFormValues) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ form, onSubmitLogin }) => {
     const {
          control,
          handleSubmit,
          formState: { errors, isSubmitting, isValid },
     } = form;

     return (
          <FormControl
               component="form"
               onSubmit={handleSubmit(onSubmitLogin)}
               sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
               <BaseInputController
                    control={control}
                    name="email"
                    label="Email address"
                    placeholder="Enter your email address"
                    errorMessage={errors?.email?.message}
               />
               <BaseInputController
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
                         sx={{ marginTop: 1 }}
                         disabled={!isValid || isSubmitting}
                    >
                         Login
                    </Button>
               </Box>
               <Link to="/register">
                    <Typography variant="body2" textAlign="center">
                         Register Now
                    </Typography>
               </Link>
          </FormControl>
     );
};

export default LoginForm;
