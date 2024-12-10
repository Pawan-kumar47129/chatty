import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';

import connectDB from "./lib/db.js";

import authRoutes from "./routers/auth.route.js";
import messageRoutes from "./routers/message.route.js";

dotenv.config({ path: "./src/.env" });
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true,
}))

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT;
console.log(PORT);
app.listen(PORT, (err) => {
  if (err) console.log(err);
  else {
    console.log(`server is running on port ${PORT}`);
    connectDB();
  }
});
