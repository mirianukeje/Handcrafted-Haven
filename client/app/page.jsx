import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CTA from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#FFF8F0] text-[#333333] font-sans">
      {/* Navbar (fixed) */}
      <Navbar />

      {/* Add spacing because navbar is fixed */}
      <div className="pt-20">
        <Hero />
        <FeaturedProducts />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}