import mongoose from "mongoose";
import dbConnect from "@/utils/shortVideoGen/db";

const videoSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true },
    userName: String,
    videoScript: Array,
    images: Array,
    audioUrl: String,
    captions: Array,
  },
  {
    timestamps: true,
  }
);

let VideoModel: any = null;

export default async function getVideoModel() {
  if (!VideoModel) {
    const conn = await dbConnect();
    VideoModel = conn.model("Video", videoSchema);
  }
  return VideoModel;
}
