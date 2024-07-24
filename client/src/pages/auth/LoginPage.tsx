import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginFormSchema } from "~/utils/validation";
import LoginForm from "~/components/form/LoginForm";
import useAppDispatch from "~/hooks/useAppDispatch";
import { login } from "~/store/slices/authSlice";

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const form = useForm<yup.InferType<typeof loginFormSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginFormSchema),
    mode: "onChange",
  });

  const handleSubmitLogin = async (
    data: yup.InferType<typeof loginFormSchema>
  ) => {
    try {
      console.log(data);

      dispatch(login(data));
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        width: "400px",
        backgroundColor: "background.paper",
        padding: "40px 30px",
        borderRadius: 10,
      }}
    >
      <Typography variant="h4" textAlign="center">
        Login
      </Typography>
      <LoginForm form={form} onSubmitLogin={handleSubmitLogin} />
    </Box>
  );
};

export default LoginPage;
