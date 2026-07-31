import Hero from "@/components/sections/Hero";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import BestSellers from "@/components/sections/BestSellers";
import LuxuryBanner from "@/components/sections/LuxuryBanner";
import LuxuryCollection from "@/components/sections/LuxuryCollection";
import BrandStory from "@/components/sections/BrandStory";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import Newsletter from "@/components/sections/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <BestSellers />
      <LuxuryBanner />
      <LuxuryCollection />
      <BrandStory />
      <WhyChooseUs />
      <Testimonials />
      <Gallery />
      <Newsletter />
    </>
  );
}