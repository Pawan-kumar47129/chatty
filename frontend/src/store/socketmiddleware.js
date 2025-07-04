import {
  setConnected,
  setDisconnected,
  setConnectionError,
} from "./socketSlice.js";

import { addMessage, setOnlineUsers } from "./chatSlice.js";

import { io } from "socket.io-client";

let socket = null; // 🔁 middleware-scoped socket
const SERVER_PORT =import.meta.env.VITE_API_URI ;
const socketMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case "socket/connect": {
      const { token, auth } = action.payload;
      if (socket?.connected) return;

      socket = io(SERVER_PORT, {
        query: {
          userId: auth?._id,
        },
        autoConnect: false,
        auth: { token },
      });
      socket.connect();
      socket.on("connect", () => {
        store.dispatch(setConnected());
      });

      socket.on("disconnect", () => {
        store.dispatch(setDisconnected());
      });

      socket.on("newMessage", (message) => {
        const { chat } = store.getState();

        const selectedUser = chat.selectedUser;

        // ✅ Only dispatch if the message is relevant to the selected conversation
        const isRelevant =
          selectedUser &&
          (message.senderId === selectedUser._id ||
            message.receiverId === selectedUser._id);

        if (isRelevant) {
          store.dispatch(addMessage(message));
        }
      });

      socket.on("messageDelivered", (message) => {
        store.dispatch(addMessage(message));
      });

      socket.on("messageError", (error) => {
        store.dispatch(setConnectionError(error));
      });

      socket.on("getOnlineUsers", (users) => {
        store.dispatch(setOnlineUsers(users));
      });
      break;
    }

    case "socket/disconnect":
      if (socket) {
        socket.disconnect();
        socket = null;
        store.dispatch(setDisconnected());
      }
      break;

    /*
    case "socket/send_private":
      if (socket?.connected) {
        socket.emit("privateMessage", {
          receiverId: action.payload.receiverId,
          content: action.payload.content,
        });
      }
      break;

    case "socket/send_group":
      if (socket?.connected) {
        socket.emit("groupMessage", {
          groupId: action.payload.groupId,
          content: action.payload.content,
        });
      }
      break;

    case "socket/join_group":
      if (socket?.connected) {
        socket.emit("joinGroup", action.payload);
      }
      break;

    case "socket/typing":
      if (socket?.connected) {
        socket.emit("typing", {
          receiverId: action.payload.receiverId,
          isTyping: action.payload.isTyping,
        });
      }
      break;

    case "socket/group_typing":
      if (socket?.connected) {
        socket.emit("groupTyping", {
          groupId: action.payload.groupId,
          isTyping: action.payload.isTyping,
        });
      }
      break;*/

    default:
      break;
  }

  return next(action);
};

export default socketMiddleware;
