import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";


interface RouteContext {

  params: Promise<{
    id: string;
  }>;

}



// UPDATE PRODUCT

export async function PUT(

  request: NextRequest,

  { params }: RouteContext

) {


  try {


    const { id } =
      await params;



    const body =
      await request.json();




    const existingProduct =
      await prisma.product.findUnique({

        where:{
          id,
        },

        include:{
          images:true,
        },

      });




    if(!existingProduct){


      return NextResponse.json(

        {
          message:
            "Product not found.",
        },

        {
          status:404,
        }

      );

    }





    // Remove old images

    await prisma.productImage.deleteMany({

      where:{

        productId:id,

      },

    });






    const product =
      await prisma.product.update({


        where:{

          id,

        },



        data:{


          name:
            body.name,


          slug:
            body.slug,


          description:
            body.description,



          price:
            Number(body.price),



          stock:
            Number(body.stock),



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




          images:{

            create:

              body.images?.map(
                (url:string)=>({

                  url,

                })

              ) ?? [],

          },


        },



        include:{


          images:true,


          brand:true,


          category:true,


        },


      });




    return NextResponse.json(

      product

    );



  } catch(error:any){


    console.error(error);




    if(error.code === "P2002"){


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




    if(error.code === "P2025"){


      return NextResponse.json(

        {

          message:
            "Product not found.",

        },

        {

          status:404,

        }

      );

    }




    return NextResponse.json(

      {

        message:
          "Unable to update product.",

      },

      {

        status:500,

      }

    );

  }

}





// DELETE PRODUCT

export async function DELETE(

  request: NextRequest,

  { params }: RouteContext

){


  try {


    const { id } =
      await params;




    await prisma.product.delete({

      where:{

        id,

      },

    });




    return NextResponse.json(

      {

        message:
          "Product deleted successfully.",

      }

    );




  } catch(error:any){


    console.error(error);




    return NextResponse.json(

      {

        message:
          "Unable to delete product.",

      },

      {

        status:500,

      }

    );

  }

}