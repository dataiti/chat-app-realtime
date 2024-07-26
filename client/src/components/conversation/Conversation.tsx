import { Box, Stack } from "@mui/material";
import Footer from "~/components/conversation/Footer";
import Header from "~/components/conversation/Header";
import useAppSelector from "~/hooks/useAppSelector";
import {
  conversationSelect,
  fetchCurrentConversation,
} from "~/store/slices/conversationSlice";
import { useEffect } from "react";
import useAppDispatch from "~/hooks/useAppDispatch";
import { authSelect } from "~/store/slices/authSlice";
import UserInfo from "~/components/conversation/UserInfo";

const Conversation = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(authSelect);
  const { selectedContact } = useAppSelector(conversationSelect);

  useEffect(() => {
    if (selectedContact && userInfo) {
      dispatch(
        fetchCurrentConversation({
          limit: 20,
          senderId: userInfo._id,
          recepientId: selectedContact._id,
          conversationType: "SINGLE",
        })
      );
    }
  }, [selectedContact?._id]);

  return (
    <Stack flexDirection="column" sx={{ width: "100%" }}>
      <Header />
      <Box
        sx={{
          flex: 1,
          padding: 2,
          // height: "calc(40vh)",
          overflowY: "scroll",
          scrollbarWidth: "none",
          gap: 1,
        }}
      >
        <UserInfo />
        {/* <Box>{JSON.stringify(currentConversation)}</Box> */}
      </Box>
      <Footer />
    </Stack>
  );
};

export default Conversation;
