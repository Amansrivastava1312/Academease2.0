import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
// console.log(process.env.DB);
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error.message);
  }
};
