import { Schema } from "mongoose";
import dbConnect from "@/utils/imageGen/db";

const creditSchema = new Schema(
  {
    userEmail: { type: String, required: true, index: true },
    credits: Number,
    amount: Number,
  },
  { timestamps: true }
);

let creditModel: any = null;

export default async function getCreditModel() {
  if (!creditModel) {
    const conn = await dbConnect();
    creditModel = conn.model("Credit", creditSchema);
  }
  return creditModel;
}
