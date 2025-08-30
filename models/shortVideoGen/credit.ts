import mongoose from "mongoose";
import dbConnect from "@/utils/shortVideoGen/db";

const CreditSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true },
    credits: Number,
    amount: Number,
  },
  {
    timestamps: true,
  }
);

let CreditModel: any = null;

export default async function getCreditModel() {
  if (!CreditModel) {
    const conn = await dbConnect();
    CreditModel = conn.model("Credit", CreditSchema);
  }
  return CreditModel;
}
