import { NextRequest, NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";


export async function POST(
  request: NextRequest
) {

  try {

    const formData =
      await request.formData();


    const file =
      formData.get("file") as File;


    if (!file) {

      return NextResponse.json(
        {
          message:
            "No file uploaded",
        },
        {
          status:400,
        }
      );

    }


    const bytes =
      await file.arrayBuffer();


    const buffer =
      Buffer.from(bytes);



    const upload =
      await new Promise<any>(
        (resolve, reject)=>{


          cloudinary.uploader.upload_stream(
            {
              folder:
                "luxe-products",
            },

            (error,result)=>{

              if(error)
                reject(error);

              else
                resolve(result);

            }

          ).end(buffer);


        }
      );



    return NextResponse.json({

      url:
        upload.secure_url,

    });


  } catch(error){

    console.error(error);


    return NextResponse.json(
      {
        message:
          "Upload failed",
      },
      {
        status:500,
      }
    );

  }

}