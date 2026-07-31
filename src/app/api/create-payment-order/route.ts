import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";


export async function POST(
  req: Request
) {

  try {

    const body =
      await req.json();


    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customer,
      items,
      amount,
    } = body;



    // Verify Razorpay signature

    const generatedSignature =
      crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET!
      )
      .update(
        razorpay_order_id +
        "|" +
        razorpay_payment_id
      )
      .digest("hex");



    if(
      generatedSignature !==
      razorpay_signature
    ){

      return NextResponse.json(
        {
          success:false,
          message:
          "Invalid payment signature"
        },
        {
          status:400
        }
      );

    }



    // Get logged user if available

    let userId:string | undefined;


    try {

      const cookieStore =
        await cookies();


      const token =
        cookieStore
        .get("token")
        ?.value;



      if(token){

        const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET!
        ) as {
          userId:string;
        };


        userId =
        decoded.userId;

      }


    } catch(error){

      console.log(
        "No logged user"
      );

    }



    // Create Order

    const order =
    await prisma.order.create({

      data:{


        userId,


        firstName:
        customer.name,


        lastName:
        "",


        email:
        customer.email,


        phone:
        customer.phone,


        address:
        customer.address,


        city:
        "",


        country:
        "India",


        postcode:
        "",


        subtotal:
        amount,


        shipping:
        0,


        tax:
        0,


        total:
        amount,


        status:
        "paid",



        items:{

          create:

          items.map(
            (item:any)=>({

              productId:
              item.id,


              name:
              item.name,


              price:
              item.price,


              quantity:
              item.quantity,


              image:
              item.image,

            })
          )

        }

      },

      include:{
        items:true
      }

    });




    return NextResponse.json({

      success:true,

      orderId:
      order.id,


      paymentId:
      razorpay_payment_id

    });



  }

  catch(error){


    console.error(
      "VERIFY ERROR",
      error
    );


    return NextResponse.json(

      {
        success:false,
        message:
        "Verification failed"
      },

      {
        status:500
      }

    );

  }

}