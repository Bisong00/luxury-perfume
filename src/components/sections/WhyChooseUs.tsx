"use client";

import { ShieldCheck, Truck, Gem, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Gem,
    title: "Premium Ingredients",
    description: "Exceptional fragrance oils sourced from around the world.",
  },
  {
    icon: Award,
    title: "Luxury Craftsmanship",
    description: "Each bottle is designed with elegance and attention to detail.",
  },
  {
    icon: Truck,
    title: "Worldwide Delivery",
    description: "Fast, secure shipping with premium packaging.",
  },
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    description: "Every fragrance is 100% genuine and quality assured.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-32 bg-white">

      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center mb-20">
          <p className="uppercase tracking-[0.4em] text-[#C7A463]">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-5xl font-light">
            Luxury In Every Detail
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="rounded-[30px] bg-[#f8f5f2] p-10 text-center shadow-lg transition hover:-translate-y-2"
              >
                <Icon
                  className="mx-auto mb-6 text-[#C7A463]"
                  size={50}
                />

                <h3 className="mb-4 text-2xl">
                  {feature.title}
                </h3>

                <p>{feature.description}</p>
              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}