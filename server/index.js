import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

//router
app.use("/api", userRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDb();
});
