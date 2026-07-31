"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function LuxuryBanner() {
  return (
    <section className="relative h-[85vh] overflow-hidden">

      {/* Background */}
      <motion.div
        initial={{ scale: 1.15 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.8 }}
        viewport={{ once: true }}
        className="absolute inset-0"
      >
        <Image
          src="/backgrounds/mist.jpg"
          alt="Luxury Banner"
          fill
          className="object-cover"
        />
      </motion.div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center">

        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center text-white"
        >
          <p className="mb-6 tracking-[0.45em] uppercase text-[#C7A463]">
            Luxury Fragrance
          </p>

          <h2 className="mb-8 text-6xl lg:text-8xl font-light">
            The Art of
            <br />
            Timeless Elegance
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-neutral-200 leading-8">
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