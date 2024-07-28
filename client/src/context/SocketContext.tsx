import React, {
     createContext,
     ReactNode,
     useContext,
     useEffect,
     useState,
} from "react";
import { io, Socket } from "socket.io-client";

import useAppDispatch from "~/hooks/useAppDispatch";
import useAppSelector from "~/hooks/useAppSelector";
import { appSelect } from "~/store/slices/appSlice";
import { authSelect } from "~/store/slices/authSlice";
import { addMessage, fetchContacts } from "~/store/slices/conversationSlice";
import { MessageResponse } from "~/types";
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
     const { userInfo } = useAppSelector(authSelect);
     const { tabConversationType } = useAppSelector(appSelect);

     const [socket, setSocket] = useState<Socket | null>(null);

     useEffect(() => {
          if (userInfo) {
               const newSocket = io(SERVER_BASE_URL, {
                    withCredentials: true,
                    query: { userId: userInfo._id },
               });

               setSocket(newSocket);

               const handleReceiveMessage = (message: MessageResponse) => {
                    if (message.status === "success") {
                         dispatch(addMessage(message.data));
                         dispatch(
                              fetchContacts({
                                   conversationType: tabConversationType,
                              })
                         );
                    }
               };

               newSocket.on("receiveMessage", handleReceiveMessage);
               newSocket.on("connect", () => {
                    console.log("✅ Connected to socket server");
               });

               return () => {
                    newSocket.off("receiveMessage", handleReceiveMessage);
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
