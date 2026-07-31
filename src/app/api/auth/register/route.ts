import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";


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
          message:
          "All fields are required"
        },
        {
          status:400
        }
      );
    }


    const existingUser =
      await prisma.user.findUnique({
        where:{
          email
        }
      });


    if(existingUser){

      return NextResponse.json(
        {
          message:
          "Email already exists"
        },
        {
          status:400
        }
      );

    }


    const hashedPassword =
      await bcrypt.hash(
        password,
        12
      );


    const user =
      await prisma.user.create({

        data:{
          name,
          email,
          password:
          hashedPassword
        }

      });


    return NextResponse.json(
      {
        message:
        "Account created successfully",

        user:{
          id:user.id,
          name:user.name,
          email:user.email
        }

      },
      {
        status:201
      }
    );


  } catch(error){

    console.error(error);


    return NextResponse.json(
      {
        message:
        "Something went wrong"
      },
      {
        status:500
      }
    );

  }

}