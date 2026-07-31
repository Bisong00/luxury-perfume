import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";

export async function POST(
  request: NextRequest
) {
  try {
    const {
      email,
      password,
    } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          message:
            "Email and password are required.",
        },
        {
          status: 400,
        }
      );
    }

    const user =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const passwordMatches =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          message:
            "Invalid email or password.",
        },
        {
          status: 401,
        }
      );
    }

    const token = signToken({
      userId: user.id,
      email: user.email,
    });

    const cookieStore =
      await cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Internal server error.",
      },
      {
        status: 500,
      }
    );
  }
}