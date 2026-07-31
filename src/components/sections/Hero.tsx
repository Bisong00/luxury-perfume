"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* Background */}
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/hero.jpg"
          alt="Luxury Perfume"
          fill
          priority
          className="object-cover"
        />
      </motion.div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">

        <div className="mx-auto max-w-7xl w-full px-8">

          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <p className="mb-6 uppercase tracking-[0.55em] text-[#C7A463]">
              Luxury Fragrance Collection
            </p>

            <h1 className="mb-8 font-[family-name:var(--font-heading)] text-6xl font-light leading-[1.05] text-white lg:text-8xl">
              Wear
              <br />
              Confidence
              <br />
              Every Day
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-8 text-neutral-200">
              Discover handcrafted perfumes created with exceptional
              ingredients and timeless elegance for every occasion.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="btn-primary">
                Shop Collection
              </button>

              <button className="btn-outline">
                Discover More
              </button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white"
      >
        <ChevronDown size={34} />
      </motion.div>

    </section>
  );
}