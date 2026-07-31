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
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}

        <div className="mb-10 text-center sm:mb-12 lg:mb-16">
          <p className="mb-3 uppercase tracking-[0.3em] text-[#C7A463] text-xs sm:text-sm">
            Luxury Selection
          </p>

          <h2 className="font-[family-name:var(--font-heading)] text-3xl font-light sm:text-4xl lg:text-5xl">
            Featured Collection
          </h2>
        </div>

        {/* Grid */}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {perfumes.map((item) => (

            <div
              key={item.name}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              <div className="relative aspect-[3/4] overflow-hidden">

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width:640px) 100vw,
                         (max-width:1024px) 50vw,
                         25vw"
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

              </div>

              <div className="p-5 sm:p-6">

                <h3 className="text-lg font-semibold sm:text-xl">
                  {item.name}
                </h3>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}