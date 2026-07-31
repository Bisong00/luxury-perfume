"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShoppingBag } from "lucide-react";

const products = [
  {
    id: 1,
    name: "ÉLIXIR NOIR",
    image: "/products/smoke.jpg",
    price: "$129",
  },
  {
    id: 2,
    name: "BLEU IMPÉRIAL",
    image: "/products/bleu.jpg",
    price: "$115",
  },
  {
    id: 3,
    name: "ARMANI CODE",
    image: "/products/armani.jpg",
    price: "$149",
  },
  {
    id: 4,
    name: "VERSACE EROS",
    image: "/products/versace.jpg",
    price: "$139",
  },
];

export default function BestSellers() {
  return (
    <section className="bg-[#f8f5f2] py-16 sm:py-20 lg:py-28">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-12 text-center sm:mb-16 lg:mb-20"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-[#C7A463] sm:text-sm sm:tracking-[0.45em]">
            Best Sellers
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-light sm:text-4xl lg:mt-5 lg:text-6xl">
            Signature Collection
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {products.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-[30px] bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative aspect-[3/4] overflow-hidden">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width:640px) 100vw,
                         (max-width:1024px) 50vw,
                         25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

                <button className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 translate-y-10 rounded-full bg-white px-6 py-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 lg:block">
                  Quick View
                </button>

              </div>

              <div className="p-5 sm:p-6 lg:p-8">

                <div className="mb-3 flex">

                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="#C7A463"
                      color="#C7A463"
                    />
                  ))}

                </div>

                <h3 className="mb-2 text-xl font-light sm:text-2xl">
                  {product.name}
                </h3>

                <p className="mb-6 text-lg font-semibold text-[#C7A463]">
                  {product.price}
                </p>

                <button className="flex w-full items-center justify-center gap-3 rounded-full border py-3 transition hover:bg-black hover:text-white">
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

              </div>

            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}