import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from 'path';

import {app,server,io}  from './lib/socket.js';// import server express app and socket.io instance
import connectDB from "./lib/db.js";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
 const __dirname = path.resolve();
dotenv.config({ path: "./src/.env" });
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true,
}))
app.get("/",(req,res)=>{
  res.status(200).json({
    message:"server is running",
    success:true,
  });
})
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
const PORT = process.env.PORT;

server.listen(PORT, async (err) => {
  if (err) console.log(err);
  else {
    await connectDB();
    console.log(`server is running on port ${PORT}`);
  }
});

