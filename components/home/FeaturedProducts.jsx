// components/home/FeaturedProducts.jsx
import ProductCard from "@/components/product/ProductCard";
import { Merriweather } from "next/font/google";

// Initialize Merriweather locally
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

export default function FeaturedProducts() {
  const products = [1, 2, 3];

  return (
    <section className="px-6 py-12">
      <h3 className={`${merriweather.className} text-3xl mb-8 text-center`}>
        Featured Products
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((item) => (
          <ProductCard key={item} />
        ))}
      </div>
    </section>
  );
}