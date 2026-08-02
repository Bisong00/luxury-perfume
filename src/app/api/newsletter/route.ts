import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";

const TO_EMAIL =
  process.env.CONTACT_EMAIL ||
  process.env.RESEND_FROM_EMAIL;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          message: "Email is required.",
        },
        {
          status: 400,
        }
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          message: "Invalid email address.",
        },
        {
          status: 400,
        }
      );
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: TO_EMAIL!,
      subject: "New Newsletter Subscription",
      html: `
        <div style="font-family:Arial,sans-serif">
          <h2>New Newsletter Subscriber</h2>

          <p>
            A visitor subscribed to your luxury perfume newsletter.
          </p>

          <hr />

          <p>
            <strong>Email:</strong>
            ${email}
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Subscribed successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to subscribe.",
      },
      {
        status: 500,
      }
    );
  }
}