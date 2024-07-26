import React, {
     createContext,
     ReactNode,
     useContext,
     useEffect,
     useState,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

import useAppDispatch from "~/hooks/useAppDispatch";
import { authSelect } from "~/store/slices/authSlice";
import { addMessage, setChatDetail } from "~/store/slices/conversationSlice";
import { ConversationDetailResponse, MessageResponse } from "~/types/types";
import { SERVER_BASE_URL } from "~/utils/constants";

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
     children: ReactNode;
}

export const useSocket = () => {
     return useContext(SocketContext);
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
     const dispatch = useAppDispatch();
     const { userInfo } = useSelector(authSelect);

     const [socket, setSocket] = useState<Socket | null>(null);

     useEffect(() => {
          if (userInfo) {
               const newSocket = io(SERVER_BASE_URL, {
                    withCredentials: true,
                    query: { userId: userInfo._id },
               });

               setSocket(newSocket);

               const handleReceiveDetail = (
                    message: ConversationDetailResponse
               ) => {
                    console.log(message.data);
                    if (message.status === "success") {
                         dispatch(setChatDetail(message));
                    }
               };

               const handleReceiveMessage = (message: MessageResponse) => {
                    console.log("====================================");
                    console.log(message);
                    console.log("====================================");
                    if (message.status === "success") {
                         dispatch(addMessage(message.data));
                    }
               };

               newSocket.on("receiveConversationDetail", handleReceiveDetail);
               newSocket.on("receiveMessage", handleReceiveMessage);
               newSocket.on("connect", () => {
                    console.log("✅ Connected to socket server");
               });

               return () => {
                    newSocket.disconnect();
               };
          }
     }, [userInfo, dispatch]);

     return (
          <SocketContext.Provider value={socket}>
               {children}
          </SocketContext.Provider>
     );
};
