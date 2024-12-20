import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

//used to store online users
const userSockerMap={};
export function getReceiverSocketId(receiverId){
    return userSockerMap[receiverId];
}
io.on('connection',(socket)=>{
    console.log("A user is connected ",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId){
        userSockerMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSockerMap))
    socket.on('disconnect',(reason)=>{
      console.log("disconnectd user",socket.id,reason);
      delete userSockerMap[userId];
      io.emit("getOnlineUsers",Object.keys(userSockerMap));
    });
    socket.emit("message","good morning");
    socket.on('message',(message)=>{
      console.log(message);
    })
  });
  

export {app,server,io};