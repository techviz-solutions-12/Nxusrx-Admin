import { useState, createContext, useEffect, useMemo } from "react";
import {
  connectionWithSocketServer,
  socketServer,
} from "../realtimeCommunication/socketConnection";
import { addSocket } from "../services/auth";

import { useDispatch, useSelector } from "react-redux";

const context = {};

export const SocketContext = createContext(context);

export function SocketContextProvider(props) {
  const dispatch = useDispatch();
  const { user, sockets } = useSelector((state) => state?.auth);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    dispatch(addSocket([]));
  }, []);

  useEffect(() => {
    if (user && user?.email) {
      if (socketServer()) {
        socketServer().emit("forceDisconnect", sockets);
        dispatch(addSocket([]));
      }

      setTimeout(() => {
        connectionWithSocketServer(user);
      }, 1000);
    }
    return () => {
      if (socketServer()) {
        socketServer().off("connect");
        socketServer().off("disconnect");
        socketServer().off();
      }
    };
  }, [user]);

  return <SocketContext.Provider>{props.children}</SocketContext.Provider>;
}
