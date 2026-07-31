"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const collections = [
  {
    title: "Luxury Oud",
    subtitle: "Deep • Bold • Timeless",
    image: "/products/smoke.jpg",
  },
  {
    title: "Fresh Citrus",
    subtitle: "Fresh • Clean • Elegant",
    image: "/products/bleu.jpg",
  },
  {
    title: "Classic Elegance",
    subtitle: "Luxury • Confidence",
    image: "/products/armani.jpg",
  },
];

export default function LuxuryCollections() {
  return (
    <section
      id="collection"
      className="bg-[#f8f5f2] py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <p className="tracking-[0.4em] uppercase text-[#B88A44]">
            Luxury Collection
          </p>

          <h2 className="mt-4 text-5xl font-light">
            Crafted To Leave A Lasting Impression
          </h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {collections.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-3xl bg-white shadow-xl"
            >
              <div className="relative h-[520px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-8 left-8 text-white">
                  <p className="mb-2 text-sm uppercase tracking-[0.3em]">
                    {item.subtitle}
                  </p>

                  <h3 className="text-3xl font-light">
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}