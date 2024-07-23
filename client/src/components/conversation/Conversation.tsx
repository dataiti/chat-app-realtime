import { Box, Stack } from "@mui/material";
import Footer from "~/components/conversation/Footer";
import Header from "~/components/conversation/Header";

const Conversation = () => {
  return (
    <Stack flexDirection="column" sx={{ width: "100%" }}>
      <Header />
      <Box sx={{ flex: 1, padding: 2 }}>dasds</Box>
      <Footer />
    </Stack>
  );
};

export default Conversation;
