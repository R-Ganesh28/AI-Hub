import mongoose from "mongoose";

let shortVideoDB: mongoose.Connection | null = null;

export default async function dbConnect() {
  if (shortVideoDB && shortVideoDB.readyState === 1) return shortVideoDB;

  try {
    shortVideoDB = await mongoose
      .createConnection(process.env.SHORT_VIDEO_GEN_DATABASE!)
      .asPromise();
    console.log("Connected to shortVideoGen DB");
    return shortVideoDB;
  } catch (error) {
    console.error("shortVideoGen DB connection error:", error);
    throw error;
  }
}
