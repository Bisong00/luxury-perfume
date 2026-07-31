"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Emma Williams",
    text: "The fragrance lasts all day and feels incredibly luxurious. The packaging alone is stunning.",
  },
  {
    name: "James Carter",
    text: "One of the finest perfume collections I've ever purchased. Exceptional quality.",
  },
  {
    name: "Sophia Brown",
    text: "Elegant, sophisticated, and unforgettable. I receive compliments every time I wear it.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-[#f8f5f2] py-32">

      <div className="mx-auto max-w-5xl px-6">

        <div className="mb-20 text-center">

          <p className="uppercase tracking-[0.4em] text-[#C7A463]">
            Testimonials
          </p>

          <h2 className="mt-4 text-5xl font-light">
            Loved Around The World
          </h2>

        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{
            delay: 4000,
          }}
          loop
          spaceBetween={40}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>

              <div className="rounded-[30px] bg-white p-14 shadow-xl">

                <div className="mb-8 flex justify-center">

                  {[1,2,3,4,5].map((i)=>(
                    <Star
                      key={i}
                      fill="#C7A463"
                      color="#C7A463"
                    />
                  ))}

                </div>

                <p className="mb-10 text-center text-xl italic">
                  "{item.text}"
                </p>

                <h3 className="text-center text-2xl">
                  {item.name}
                </h3>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </div>

    </section>
  );
}