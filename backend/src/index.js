import dotenv from "dotenv";
dotenv.config({ path: "./src/.env" });
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import { app, server, io } from "./lib/socket.js"; // import server express app and socket.io instance
import connectDB from "./lib/db.js";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.status(200).json({
    message: "server is running",
    success: true,
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
const PORT = process.env.PORT;

connectDB()
  .then(() => {
    server.listen(PORT, async (err) => {
      if (err) {
        console.log(err);
        process.exit(1);
      } else {
        console.log(`server is running on port ${PORT}`);
      }
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
