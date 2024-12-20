import { useSelector } from "react-redux";
import { io } from "socket.io-client";
const SERVER_PORT =import.meta.env.MODE==='development'? "http://localhost:5001":"/";

let socket = null;

export const getSocket = () => {
    const {socketConnected,authUser}=useSelector((state)=>state.auth);
  if (!socket && !socketConnected && authUser) {
    socket = io(SERVER_PORT,{
      query:{
        userId:authUser?._id
      },
      autoConnect:false,
    }); // Your Socket server URL
  }
  return socket;
};