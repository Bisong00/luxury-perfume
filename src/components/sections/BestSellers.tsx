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
    <section className="bg-[#f8f5f2] py-32">

      <div className="mx-auto max-w-7xl px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <p className="uppercase tracking-[0.45em] text-[#C7A463]">
            Best Sellers
          </p>

          <h2 className="mt-5 text-6xl font-light">
            Signature Collection
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {products.map((product, index) => (

            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                y: 80,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-[30px] bg-white shadow-xl"
            >

              <div className="relative h-[420px] overflow-hidden">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/20 opacity-0 transition group-hover:opacity-100" />

                <button className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-10 rounded-full bg-white px-8 py-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Quick View
                </button>

              </div>

              <div className="p-8">

                <div className="mb-4 flex">

                  {[1,2,3,4,5].map((star)=>(
                    <Star
                      key={star}
                      size={16}
                      fill="#C7A463"
                      color="#C7A463"
                    />
                  ))}

                </div>

                <h3 className="mb-2 text-2xl font-light">
                  {product.name}
                </h3>

                <p className="mb-8 text-lg font-semibold text-[#C7A463]">
                  {product.price}
                </p>

                <button className="flex w-full items-center justify-center gap-3 rounded-full border py-4 transition hover:bg-black hover:text-white">
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