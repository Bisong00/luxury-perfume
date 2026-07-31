"use client";

import { useRef, useState } from "react";


interface ImageUploadProps {

  images: string[];

  onChange: (images: string[]) => void;

}



export default function ImageUpload({

  images,

  onChange,

}: ImageUploadProps) {



  const [loading, setLoading] =
    useState(false);



  const inputRef =
    useRef<HTMLInputElement>(null);





  async function uploadImages(

    e: React.ChangeEvent<HTMLInputElement>

  ) {



    const files =
      e.target.files;



    if (!files || files.length === 0)
      return;





    setLoading(true);



    try {



      const uploadedImages:string[] = [];





      for(
        const file of Array.from(files)
      ) {



        const formData =
          new FormData();



        formData.append(
          "file",
          file
        );





        const response =
          await fetch(

            "/api/admin/upload",

            {

              method:"POST",

              body:formData,

            }

          );





        const data =
          await response.json();





        if(data.url){

          uploadedImages.push(
            data.url
          );

        }



      }





      onChange([

        ...images,

        ...uploadedImages,

      ]);





      if(inputRef.current){

        inputRef.current.value = "";

      }





    } catch(error){



      console.error(error);



      alert(
        "Image upload failed"
      );



    } finally {



      setLoading(false);



    }



  }






  function removeImage(

    image:string

  ){



    onChange(

      images.filter(
        (item)=>item !== image
      )

    );


  }







  return (

    <div>



      <input


        ref={inputRef}


        type="file"


        accept="image/*"


        multiple


        onChange={uploadImages}


        className="
          rounded-xl
          border
          p-3
        "


      />





      {loading && (

        <p
          className="
            mt-3
            text-sm
            text-neutral-500
          "
        >

          Uploading images...

        </p>

      )}






      <div

        className="
          mt-6
          grid
          grid-cols-2
          gap-4
          md:grid-cols-4
        "

      >



        {images.map((image)=>(


          <div

            key={image}

            className="
              relative
              overflow-hidden
              rounded-xl
            "

          >



            <img

              src={image}

              alt="product"

              className="
                h-32
                w-full
                object-cover
              "

            />





            <button


              type="button"


              onClick={()=>
                removeImage(image)
              }


              className="
                absolute
                right-2
                top-2
                rounded-full
                bg-black
                px-3
                py-1
                text-sm
                text-white
                hover:bg-red-600
              "


            >

              ×

            </button>



          </div>



        ))}



      </div>



    </div>

  );

}