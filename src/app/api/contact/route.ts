import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const {
      name,
      email,
      subject,
      message,
    } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          message: "Please fill in all fields.",
        },
        {
          status: 400,
        }
      );
    }

    await resend.emails.send({
      from: "Luxury Perfume <onboarding@resend.dev>",

      to: process.env.CONTACT_EMAIL!,

      replyTo: email,

      subject: `Website Contact: ${subject}`,

      html: `
        <div style="font-family:Arial,sans-serif;padding:30px">

          <h2>New Contact Form Submission</h2>

          <hr/>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Subject:</strong> ${subject}</p>

          <h3>Message</h3>

          <p>${message.replace(/\n/g, "<br/>")}</p>

        </div>
      `,
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Unable to send email.",
      },
      {
        status: 500,
      }
    );
  }
}