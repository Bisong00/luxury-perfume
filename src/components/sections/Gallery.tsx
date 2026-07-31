"use client";

import Image from "next/image";

const gallery = [
  "/products/armani.jpg",
  "/products/bleu.jpg",
  "/products/smoke.jpg",
  "/products/versace.jpg",
  "/hero/hero.jpg",
  "/backgrounds/mist.jpg",
];

export default function Gallery() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-28">

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12 text-center sm:mb-16 lg:mb-20">

          <p className="text-xs uppercase tracking-[0.3em] text-[#C7A463] sm:text-sm sm:tracking-[0.4em]">
            Instagram
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-heading)] text-3xl font-light sm:text-4xl lg:text-5xl">
            Follow Our Journey
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">

          {gallery.map((image) => (
            <div
              key={image}
              className="group relative aspect-square overflow-hidden rounded-2xl sm:rounded-3xl"
            >
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width:640px) 50vw,
                       (max-width:1024px) 50vw,
                       33vw"
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}