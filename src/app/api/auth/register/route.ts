import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { signToken } from "@/lib/jwt";

export async function POST(
  request: Request
) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      password,
    } = body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        {
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          message:
            "Password must contain at least 6 characters.",
        },
        {
          status: 400,
        }
      );
    }

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      });

    if (existingUser) {
      return NextResponse.json(
        {
          message:
            "An account with this email already exists.",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

    // Automatically log the user in
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

    return NextResponse.json(
      {
        success: true,
        message:
          "Account created successfully.",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}