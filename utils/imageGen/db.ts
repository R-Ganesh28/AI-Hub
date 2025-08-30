import mongoose from "mongoose";

let imageDb: mongoose.Connection | null = null;

export default async function dbConnect() {
  if (imageDb && imageDb.readyState === 1) return imageDb;

  try {
    imageDb = await mongoose
      .createConnection(process.env.IMAGE_GEN_DATABASE!)
      .asPromise();
    console.log("Connected to imageGen DB");
    return imageDb;
  } catch (error) {
    console.error("imageGen DB connection error:", error);
    throw error;
  }
}
