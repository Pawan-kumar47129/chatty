import dotenv from "dotenv"
import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
dotenv.config({ path: "./src/.env" });
const app=express();

const server=http.createServer(app);

const io=new Server(server,{
    cors:{
        origin:[process.env.CORS_ORIGIN]
    }
});

//used to store online users
const userSockerMap={};
export function getReceiverSocketId(receiverId){
    return userSockerMap[receiverId];
}
io.on('connection',(socket)=>{
    const userId=socket.handshake.query.userId;
    if(userId){
        userSockerMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSockerMap))
    socket.on('disconnect',(reason)=>{
      delete userSockerMap[userId];
      io.emit("getOnlineUsers",Object.keys(userSockerMap));
    });
    socket.emit("message","good morning");
    socket.on('message',(message)=>{
      console.log(message);
    })
  });
  

export {app,server,io};