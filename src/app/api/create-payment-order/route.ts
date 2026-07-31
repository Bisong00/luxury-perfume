import { NextResponse } from "next/server";
import razorpay from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { amount } = body;

    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid amount",
        },
        {
          status: 400,
        }
      );
    }

    const order = await razorpay.orders.create({
      amount: Math.round(Number(amount) * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
    });

    return NextResponse.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });

  } catch (error) {

    console.error(
      "CREATE PAYMENT ORDER ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create Razorpay order",
      },
      {
        status: 500,
      }
    );

  }
}