import { config } from "./config";
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database", error);
    process.exit(1);
  }
};

export default connectDB;
