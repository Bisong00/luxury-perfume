import { NextResponse } from "next/server";
import crypto from "crypto";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";


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




    /*
      VERIFY RAZORPAY SIGNATURE
    */

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




    if (
      generatedSignature !==
      razorpay_signature
    ) {

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




    /*
      FIND CURRENT USER
    */

    let userId:string | null = null;


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


    }
    catch(error){

      console.log(
        "Guest checkout"
      );

    }





    /*
      CREATE ORDER + UPDATE STOCK
    */


    const order =
      await prisma.$transaction(
        async (tx)=>{


          const newOrder =
            await tx.order.create({

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
                Number(amount),



                shipping:
                0,



                tax:
                0,



                total:
                Number(amount),




                status:
                "paid",




                razorpayOrderId:
                razorpay_order_id,



                razorpayPaymentId:
                razorpay_payment_id,




                items:{


                  create:

                  items.map(
                    (item:any)=>({


                      productId:
                      item.id,



                      name:
                      item.name,



                      price:
                      Number(
                        item.price
                      ),



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







          /*
            REDUCE PRODUCT STOCK
          */


          for(
            const item of items
          ){


            await tx.product.update({

              where:{
                id:item.id
              },


              data:{

                stock:{
                  decrement:
                  item.quantity
                }

              }


            });


          }





          return newOrder;


        }
      );






    return NextResponse.json({

      success:true,


      orderId:
      order.id,


      message:
      "Payment verified and order created"


    });





  }

  catch(error){


    console.error(
      "VERIFY PAYMENT ERROR",
      error
    );



    return NextResponse.json(

      {

        success:false,

        message:
        "Payment verification failed"

      },

      {

        status:500

      }

    );


  }

}