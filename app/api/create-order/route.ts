import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET!,
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount } = body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const order = await razorpay.orders.create(options);
    return NextResponse.json({ order });
  } catch (err) {
    return NextResponse.json(
      { error: "Order creation failed" },
      { status: 500 }
    );
  }
}
