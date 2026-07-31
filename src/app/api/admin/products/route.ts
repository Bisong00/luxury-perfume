import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";


// CREATE PRODUCT
export async function POST(
  request: NextRequest
) {

  try {

    const body = await request.json();


    const product =
      await prisma.product.create({

        data: {

          name: body.name,

          slug: body.slug,

          description: body.description,


          price: Number(body.price),


          stock: Number(body.stock),


          featured:
            body.featured ?? false,


          bestSeller:
            body.bestSeller ?? false,


          newArrival:
            body.newArrival ?? false,


          brandId:
            body.brandId,


          categoryId:
            body.categoryId,



          // SAVE CLOUDINARY IMAGES
          images: {

            create:

              body.images?.map(
                (url: string) => ({
                  url,
                })
              ) ?? [],

          },


        },


        include: {

          images: true,

        },


      });



    return NextResponse.json(

      product,

      {
        status: 201,
      }

    );



  } catch(error:any) {


    console.error(error);



    if(error.code === "P2002") {

      return NextResponse.json(

        {
          message:
            "A product with this slug already exists.",
        },

        {
          status:409,
        }

      );

    }



    return NextResponse.json(

      {
        message:
          "Unable to create product.",
      },

      {
        status:500,
      }

    );

  }

}