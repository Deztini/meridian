import mongoose from "mongoose";
import { env } from "./env";

export async function connectDB() {
  try {
    await mongoose.connect(env.databaseUrl);
    console.log("MONGODB connected succesfully");
  } catch {
    console.error("Connection failed");
  }
}
