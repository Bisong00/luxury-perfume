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
    <section className="py-32 bg-white">

      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-20 text-center">

          <p className="uppercase tracking-[0.4em] text-[#C7A463]">
            Instagram
          </p>

          <h2 className="mt-4 text-5xl font-light">
            Follow Our Journey
          </h2>

        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-3">

          {gallery.map((image) => (
            <div
              key={image}
              className="group relative h-[380px] overflow-hidden rounded-[30px]"
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/30" />

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}