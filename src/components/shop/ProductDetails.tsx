"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cart.store";
import { useCartUIStore } from "@/store/cart-ui.store";

import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";

import { formatPrice } from "@/utils/currency";

interface ProductImage {
  id: string;
  url: string;
  alt: string | null;
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  stock: number;

  brand: {
    name: string;
  };

  category: {
    name: string;
  };

  images: ProductImage[];
}

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({
  product,
}: ProductDetailsProps) {

  const [quantity, setQuantity] = useState(1);

  const [selectedImage, setSelectedImage] = useState(
    product.images[0]?.url ||
      "/products/placeholder.jpg"
  );

  const [tab, setTab] = useState<
    "description" | "notes" | "shipping"
  >("description");


  const addItem = useCartStore(
    (state) => state.addItem
  );

  const openCart = useCartUIStore(
    (state) => state.openCart
  );


  const handleAddToCart = () => {

    addItem({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: Number(product.price),
      image:
        product.images[0]?.url ??
        "/products/placeholder.jpg",
      quantity,
      brand: product.brand.name,
    });


    openCart();
  };


  return (
    <section className="bg-[#faf9f7] py-20">

      <div className="
        mx-auto
        grid
        max-w-7xl
        gap-16
        px-6
        lg:grid-cols-2
      ">


        {/* IMAGES */}

        <div className="flex flex-col gap-6">

          <div className="
            relative
            aspect-square
            overflow-hidden
            rounded-3xl
            border
            bg-white
          ">

            <Image
              src={selectedImage}
              alt={product.name}
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />

          </div>


          <div className="
            flex
            gap-4
            overflow-x-auto
          ">

            {product.images.map((image) => (

              <button
                key={image.id}
                onClick={() =>
                  setSelectedImage(image.url)
                }
                className={`
                  relative
                  h-24
                  w-24
                  overflow-hidden
                  rounded-2xl
                  border-2
                  ${
                    selectedImage === image.url
                    ? "border-[#B88A44]"
                    : "border-neutral-200"
                  }
                `}
              >

                <Image
                  src={image.url}
                  alt={image.alt ?? product.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />

              </button>

            ))}

          </div>

        </div>



        {/* DETAILS */}

        <div className="flex flex-col justify-center">


          <p className="
            text-sm
            uppercase
            tracking-[0.45em]
            text-[#B88A44]
          ">
            {product.brand.name}
          </p>


          <h1 className="
            mt-4
            text-5xl
            font-bold
          ">
            {product.name}
          </h1>


          <p className="mt-3 text-neutral-500">
            {product.category.name}
          </p>


          <p className="
            mt-8
            leading-8
            text-neutral-600
          ">
            {product.description}
          </p>


          <div className="mt-8">

            <span className="
              text-4xl
              font-bold
            ">
              {formatPrice(
                Number(product.price)
              )}
            </span>

          </div>



          {/* QUANTITY */}

          <div className="
            mt-10
            flex
            items-center
            gap-5
          ">

            <button
              onClick={() =>
                setQuantity(
                  Math.max(
                    1,
                    quantity - 1
                  )
                )
              }
              className="
                rounded-full
                border
                p-3
                hover:bg-black
                hover:text-white
              "
            >
              <Minus size={18}/>
            </button>


            <span className="
              text-xl
              font-semibold
            ">
              {quantity}
            </span>


            <button
              onClick={() =>
                setQuantity(
                  Math.min(
                    product.stock,
                    quantity + 1
                  )
                )
              }
              className="
                rounded-full
                border
                p-3
                hover:bg-black
                hover:text-white
              "
            >
              <Plus size={18}/>
            </button>

          </div>



          {/* BUTTONS */}

          <div className="
            mt-10
            flex
            gap-4
          ">


            <button
              onClick={handleAddToCart}
              disabled={
                product.stock === 0
              }
              className="
                flex-1
                rounded-full
                bg-black
                py-5
                text-white
                flex
                items-center
                justify-center
                gap-3
                hover:bg-[#B88A44]
              "
            >

              <ShoppingBag size={22}/>

              Add To Cart

            </button>


            <button className="
              rounded-full
              border
              p-5
            ">
              <Heart size={22}/>
            </button>


          </div>



          {/* TRUST */}

          <div className="
            mt-12
            rounded-3xl
            border
            bg-white
            p-8
            space-y-5
          ">


            <div className="flex gap-4">

              <Truck className="text-[#B88A44]"/>

              <p>
                Free Worldwide Shipping
              </p>

            </div>


            <div className="flex gap-4">

              <RotateCcw className="text-[#B88A44]"/>

              <p>
                30-Day Returns
              </p>

            </div>


            <div className="flex gap-4">

              <ShieldCheck className="text-[#B88A44]"/>

              <p>
                Authentic Products
              </p>

            </div>


          </div>


        </div>


      </div>



      {/* TABS */}

      <div className="
        mx-auto
        mt-24
        max-w-7xl
        px-6
      ">

        <div className="
          flex
          gap-4
          border-b
          pb-6
        ">

          {[
            "description",
            "notes",
            "shipping",
          ].map((item) => (

            <button
              key={item}
              onClick={() =>
                setTab(
                  item as typeof tab
                )
              }
              className={`
                rounded-full
                px-6
                py-3
                capitalize
                ${
                  tab === item
                  ? "bg-black text-white"
                  : "bg-white"
                }
              `}
            >
              {item}
            </button>

          ))}

        </div>


        <div className="
          mt-8
          rounded-3xl
          bg-white
          p-10
        ">

          <AnimatePresence mode="wait">

            <motion.div
              key={tab}
              initial={{
                opacity:0,
                y:10
              }}
              animate={{
                opacity:1,
                y:0
              }}
            >

              <h2 className="
                text-2xl
                font-bold
              ">
                {tab}
              </h2>


              <p className="
                mt-6
                text-neutral-600
                leading-8
              ">
                {product.description}
              </p>


            </motion.div>

          </AnimatePresence>


        </div>


      </div>


    </section>
  );
}