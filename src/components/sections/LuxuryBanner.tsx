"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LuxuryBanner() {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] overflow-hidden">

      {/* Background */}

      <motion.div
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.8 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <Image
          src="/backgrounds/mist.jpg"
          alt="Luxury Banner"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}

      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}

      <div className="relative z-10 flex min-h-[70vh] sm:min-h-[80vh] lg:min-h-[85vh] items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mx-auto max-w-4xl px-5 text-center text-white sm:px-8"
        >

          <p className="mb-4 text-xs uppercase tracking-[0.3em] text-[#C7A463] sm:mb-6 sm:text-sm sm:tracking-[0.45em]">
            Luxury Fragrance
          </p>

          <h2 className="mb-6 font-[family-name:var(--font-heading)] text-4xl font-light leading-tight sm:text-5xl lg:mb-8 lg:text-7xl xl:text-8xl">
            The Art of
            <br />
            Timeless Elegance
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-neutral-200 sm:text-lg sm:leading-8 lg:mb-12">
            Crafted with the world's finest ingredients and inspired by
            sophistication, every fragrance tells a story.
          </p>

          <button className="btn-primary">
            Explore Collection
          </button>

        </motion.div>

      </div>

    </section>
  );
}