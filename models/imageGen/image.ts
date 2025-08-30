import { Schema } from "mongoose";
import dbConnect from "@/utils/imageGen/db";

const imageSchema = new Schema(
  {
    userEmail: String,
    userName: String,
    prompt: String,
    url: String,
  },
  { timestamps: true }
);

let ImageModel: any = null;

export default async function getImageModel() {
  if (!ImageModel) {
    const conn = await dbConnect();
    ImageModel = conn.model("Image", imageSchema);
  }
  return ImageModel;
}
