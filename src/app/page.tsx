import Hero from "@/components/sections/Hero";
import LuxuryBanner from "@/components/sections/LuxuryBanner";
import LuxuryCollection from "@/components/sections/LuxuryCollection";
import BrandStory from "@/components/sections/BrandStory";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Newsletter from "@/components/sections/Newsletter";
import Contact from "@/components/sections/Contact";

import ProductGrid from "@/components/shop/ProductGrid";

import {
  getFeaturedProducts,
  getBestSellers,
} from "@/services/product.service";

export default async function HomePage() {
  const [featuredProducts, bestSellerProducts] =
    await Promise.all([
      getFeaturedProducts(),
      getBestSellers(),
    ]);

  return (
    <>
      <Hero />

      {/* Featured Collection */}
      <section
        id="collection"
        className="bg-[#faf9f7] py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="uppercase tracking-[0.35em] text-[#B88A44]">
              Featured Collection
            </p>

            <h2 className="mt-4 text-5xl font-light">
              Signature Fragrances
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-neutral-500">
              Discover our most exclusive fragrances,
              carefully selected for timeless elegance.
            </p>
          </div>

          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <p className="uppercase tracking-[0.35em] text-[#B88A44]">
              Best Sellers
            </p>

            <h2 className="mt-4 text-5xl font-light">
              Customer Favorites
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-neutral-500">
              Loved by thousands of fragrance lovers
              around the world.
            </p>
          </div>

          <ProductGrid products={bestSellerProducts} />
        </div>
      </section>

      <LuxuryBanner />

      <LuxuryCollection />

      <BrandStory />

      <WhyChooseUs />

      <Testimonials />

      <Gallery />

      {/* Contact Section */}
      <Contact />

      <Newsletter />
    </>
  );
}