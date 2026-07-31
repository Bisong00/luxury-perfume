import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    const options = {
      amount: amount * 100, // paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}