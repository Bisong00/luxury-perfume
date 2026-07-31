import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";


const JWT_SECRET =
  process.env.JWT_SECRET!;



export async function getCurrentUser() {


  const cookieStore =
    await cookies();



  const token =
    cookieStore
      .get("token")
      ?.value;



  if(!token){

    return null;

  }





  try {


    const decoded =
      jwt.verify(
        token,
        JWT_SECRET
      ) as {
        userId:string;
      };





    const user =
      await prisma.user.findUnique({

        where:{

          id:
          decoded.userId,

        },


        include:{


          orders:{


            include:{


              items:true


            },


            orderBy:{


              createdAt:
              "desc"


            }


          }


        }


      });





    return user;



  }

  catch(error){


    console.error(
      "AUTH ERROR",
      error
    );


    return null;


  }


}