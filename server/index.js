import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDb } from "./database/db.js";
import userRouter from "./routes/user.js";
import courseRouter from "./routes/courses.js";
import adminRouter from "./routes/admin.js";
import { v2 as cloudinary } from "cloudinary";
import fileUpload from "express-fileupload";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json({ limit: "50mb" })); // Parse JSON bodies
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//router
app.use("/api", userRouter);
app.use("/api", courseRouter);
app.use("/api", adminRouter);

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  connectDb();
});
