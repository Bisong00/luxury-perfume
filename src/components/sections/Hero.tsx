"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* Background */}

      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/hero.jpg"
          alt="Luxury Perfume"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />

      {/* Content */}

      <div className="relative z-10 flex min-h-screen items-center">

        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >

            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-[#C7A463] sm:text-sm lg:mb-6 lg:tracking-[0.55em]">
              Luxury Fragrance Collection
            </p>

            <h1 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-light leading-tight text-white sm:text-5xl md:text-6xl lg:mb-8 lg:text-8xl">
              Wear
              <br />
              Confidence
              <br />
              Every Day
            </h1>

            <p className="mb-8 max-w-xl text-base leading-7 text-neutral-200 sm:text-lg sm:leading-8 lg:mb-10">
              Discover handcrafted perfumes created with exceptional
              ingredients and timeless elegance for every occasion.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap">

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

      {/* Scroll */}

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white sm:bottom-10"
      >
        <ChevronDown className="h-7 w-7 sm:h-8 sm:w-8" />
      </motion.div>

    </section>
  );
}