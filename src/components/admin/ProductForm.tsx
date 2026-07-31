"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import ImageUpload from "@/components/admin/ImageUpload";


interface Brand {
  id: string;
  name: string;
}


interface Category {
  id: string;
  name: string;
}


interface ProductImage {
  id: string;
  url: string;
}


interface Product {

  id: string;

  name: string;

  slug: string;

  description: string;

  price: number;

  stock: number;

  featured: boolean;

  bestSeller: boolean;

  newArrival: boolean;

  brandId: string;

  categoryId: string;

  images: ProductImage[];

}



interface ProductFormProps {

  product?: Product;

  brands: Brand[];

  categories: Category[];

}



export default function ProductForm({

  product,

  brands,

  categories,

}: ProductFormProps) {


  const router = useRouter();



  const [loading, setLoading] =
    useState(false);



  const [name, setName] =
    useState(
      product?.name ?? ""
    );



  const [slug, setSlug] =
    useState(
      product?.slug ?? ""
    );



  const [description, setDescription] =
    useState(
      product?.description ?? ""
    );



  const [price, setPrice] =
    useState(
      product?.price?.toString() ?? ""
    );



  const [stock, setStock] =
    useState(
      product?.stock?.toString() ?? ""
    );



  const [brandId, setBrandId] =
    useState(
      product?.brandId ??
      brands[0]?.id ??
      ""
    );



  const [categoryId, setCategoryId] =
    useState(
      product?.categoryId ??
      categories[0]?.id ??
      ""
    );



  const [featured, setFeatured] =
    useState(
      product?.featured ?? false
    );



  const [bestSeller, setBestSeller] =
    useState(
      product?.bestSeller ?? false
    );



  const [newArrival, setNewArrival] =
    useState(
      product?.newArrival ?? false
    );



  const [images, setImages] =
    useState<string[]>(
      product?.images?.map(
        (image)=>image.url
      ) ?? []
    );



  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {


    e.preventDefault();


    setLoading(true);



    try {


      const response = await fetch(

        product

          ? `/api/admin/products/${product.id}`

          : "/api/admin/products",

        {

          method: product
            ? "PUT"
            : "POST",


          headers: {

            "Content-Type":
              "application/json",

          },


          body: JSON.stringify({

            name,

            slug,

            description,


            price:
              Number(price),


            stock:
              Number(stock),


            brandId,


            categoryId,


            featured,


            bestSeller,


            newArrival,


            images,


          }),


        }

      );



      const data =
        await response.json();



      if (!response.ok) {

        throw new Error(

          data.message ??
          "Unable to save product."

        );

      }



      router.push(
        "/admin/products"
      );


      router.refresh();



    } catch(error) {


      console.error(error);



      if(error instanceof Error){

        alert(
          error.message
        );

      } else {

        alert(
          "Something went wrong."
        );

      }



    } finally {


      setLoading(false);


    }


  }



  return (

    <form

      onSubmit={handleSubmit}

      className="space-y-8"

    >


      <div

        className="
          rounded-3xl
          bg-white
          p-8
          shadow-sm
        "

      >


        <h2

          className="
            mb-6
            text-2xl
            font-semibold
          "

        >

          Product Information

        </h2>



        <div

          className="
            grid
            gap-6
            md:grid-cols-2
          "

        >


          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Product Name
            </label>


            <input

              required

              value={name}

              onChange={(e)=>
                setName(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            />

          </div>

           <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Slug
            </label>


            <input

              required

              value={slug}

              onChange={(e)=>
                setSlug(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            />

          </div>




          <div className="md:col-span-2">

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Description
            </label>


            <textarea

              required

              rows={5}

              value={description}

              onChange={(e)=>
                setDescription(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            />

          </div>




          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Price
            </label>


            <input

              required

              type="number"

              step="0.01"

              value={price}

              onChange={(e)=>
                setPrice(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            />

          </div>




          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Stock
            </label>


            <input

              required

              type="number"

              value={stock}

              onChange={(e)=>
                setStock(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            />

          </div>





          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Brand
            </label>


            <select

              value={brandId}

              onChange={(e)=>
                setBrandId(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            >

              {brands.map((brand)=>(

                <option

                  key={brand.id}

                  value={brand.id}

                >

                  {brand.name}

                </option>

              ))}

            </select>

          </div>





          <div>

            <label
              className="
                mb-2
                block
                text-sm
                font-medium
              "
            >
              Category
            </label>


            <select

              value={categoryId}

              onChange={(e)=>
                setCategoryId(
                  e.target.value
                )
              }

              className="
                w-full
                rounded-xl
                border
                p-3
                outline-none
                focus:border-[#B88A44]
              "

            >

              {categories.map((category)=>(

                <option

                  key={category.id}

                  value={category.id}

                >

                  {category.name}

                </option>

              ))}

            </select>

          </div>


        </div>




        {/* PRODUCT FLAGS */}

        <div className="mt-8 space-y-3">


          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input

              type="checkbox"

              checked={featured}

              onChange={(e)=>
                setFeatured(
                  e.target.checked
                )
              }

            />

            Featured Product

          </label>




          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input

              type="checkbox"

              checked={bestSeller}

              onChange={(e)=>
                setBestSeller(
                  e.target.checked
                )
              }

            />

            Best Seller

          </label>




          <label
            className="
              flex
              items-center
              gap-3
            "
          >

            <input

              type="checkbox"

              checked={newArrival}

              onChange={(e)=>
                setNewArrival(
                  e.target.checked
                )
              }

            />

            New Arrival

          </label>


        </div>





        {/* CLOUDINARY IMAGE UPLOAD */}

        <div className="mt-10">


          <h3
            className="
              mb-4
              text-xl
              font-semibold
            "
          >

            Product Images

          </h3>



          <ImageUpload

            images={images}

            onChange={setImages}

          />


        </div>





        <button

          type="submit"

          disabled={loading}

          className="
            mt-8
            rounded-xl
            bg-black
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-[#B88A44]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "

        >

          {loading

            ? "Saving..."

            : product

            ? "Update Product"

            : "Save Product"

          }


        </button>



      </div>


    </form>

  );

}