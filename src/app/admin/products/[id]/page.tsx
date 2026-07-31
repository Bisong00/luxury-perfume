import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProductForm from "@/components/admin/ProductForm";


interface PageProps {

  params: Promise<{
    id: string;
  }>;

}



export default async function EditProductPage({

  params,

}: PageProps) {



  const { id } =
    await params;




  const product =
    await prisma.product.findUnique({

      where: {

        id,

      },

      include: {

        images: true,

      },

    });





  if (!product) {

    notFound();

  }





  const brands =
    await prisma.brand.findMany({

      orderBy: {

        name: "asc",

      },

    });





  const categories =
    await prisma.category.findMany({

      orderBy: {

        name: "asc",

      },

    });







  return (

    <>

      <div className="mb-10">


        <h1 className="text-4xl font-bold">

          Edit Product

        </h1>



        <p className="mt-2 text-neutral-500">

          Update your product information.

        </p>


      </div>





      <ProductForm


        product={{

          id: product.id,


          name: product.name,


          slug: product.slug,


          description:
            product.description,



          price:
            Number(product.price),



          stock:
            product.stock,



          featured:
            product.featured,



          bestSeller:
            product.bestSeller,



          newArrival:
            product.newArrival,



          brandId:
            product.brandId,



          categoryId:
            product.categoryId,



          images:
            product.images.map(
              (image)=>({

                id:image.id,

                url:image.url,

              })
            ),


        }}



        brands={brands}



        categories={categories}



      />


    </>

  );

}