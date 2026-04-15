// components/home/Hero.jsx
import { Merriweather } from "next/font/google";

// Initialize Merriweather locally
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

export default function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <h2 className={`${merriweather.className} text-4xl md:text-6xl mb-6 leading-tight`}>
        Discover Unique Handcrafted Treasures
      </h2>
      <p className="max-w-2xl mx-auto mb-8 text-lg">
        Support artisans and explore one-of-a-kind creations made with passion and care.
      </p>
      <button className="btn-primary transform hover:scale-105">
        Shop Now
      </button>
    </section>
  );
}