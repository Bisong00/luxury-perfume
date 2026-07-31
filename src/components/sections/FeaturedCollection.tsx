import Image from "next/image";

const perfumes = [
  {
    name: "Midnight Smoke",
    image: "/products/smoke.jpg",
  },
  {
    name: "Armani Code",
    image: "/products/armani.jpg",
  },
  {
    name: "Bleu Collection",
    image: "/products/bleu.jpg",
  },
  {
    name: "Versace Eros",
    image: "/products/versace.jpg",
  },
];

export default function FeaturedCollection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-center text-5xl font-light">
          Featured Collection
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {perfumes.map((item) => (
            <div
              key={item.name}
              className="group overflow-hidden rounded-3xl shadow-lg"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold">{item.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}