import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import {app,server,io}  from './lib/socket.js';// import server express app and socket.io instance 
import connectDB from "./lib/db.js";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";

dotenv.config({ path: "./src/.env" });
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT;

server.listen(PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(`server is running on port ${PORT}`);
    connectDB();
  }
});

