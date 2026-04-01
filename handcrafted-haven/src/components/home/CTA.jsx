// components/home/CTA.jsx
import { Merriweather } from "next/font/google";

// Initialize Merriweather locally
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

export default function CTA() {
  return (
    <section className="text-center py-16 px-6 bg-[#F5DEB3]">
      <h3 className={`${merriweather.className} text-3xl mb-4`}>Are you an artisan?</h3>
      <p className="mb-6 text-lg">
        Join our community and showcase your creations to the world.
      </p>
      <button className="btn-primary transform hover:scale-105">
        Become a Seller
      </button>
    </section>
  );
}