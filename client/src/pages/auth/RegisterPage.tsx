import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerFormSchema } from "~/utils/validation";
import RegisterForm from "~/components/form/RegisterForm";

const RegsiterPage = () => {
  const form = useForm<yup.InferType<typeof registerFormSchema>>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(registerFormSchema),
    mode: "onChange",
  });

  const handleSubmitRegister = async (
    data: yup.InferType<typeof registerFormSchema>
  ) => {
    try {
      console.log(data);
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
        Register
      </Typography>
      <RegisterForm form={form} onSubmitRegister={handleSubmitRegister} />
    </Box>
  );
};

export default RegsiterPage;
