"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function BrandStory() {
  return (
    <section
      id="about"
      className="bg-white py-28"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[650px] overflow-hidden rounded-3xl"
        >
          <Image
            src="/backgrounds/mist.jpg"
            alt="Luxury Perfume"
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="mb-4 uppercase tracking-[0.4em] text-[#B88A44]">
            Our Story
          </p>

          <h2 className="mb-8 text-5xl font-light leading-tight">
            Every Fragrance
            <br />
            Tells A Story
          </h2>

          <p className="mb-6 text-lg leading-8 text-gray-600">
            Inspired by timeless elegance and crafted with exceptional
            ingredients, our fragrances are designed to evoke emotion,
            confidence, and unforgettable memories.
          </p>

          <p className="mb-10 text-lg leading-8 text-gray-600">
            Every bottle reflects meticulous craftsmanship, premium materials,
            and a passion for creating luxurious scents that become part of your
            identity.
          </p>

          <button className="rounded-full bg-[#B88A44] px-10 py-4 text-white transition hover:bg-black">
            Discover More
          </button>
        </motion.div>

      </div>
    </section>
  );
}