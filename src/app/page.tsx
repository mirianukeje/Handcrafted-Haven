import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-16">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#A0522D]">
          Welcome to Handcrafted Haven
        </p>

        <h1 className="mt-4 font-serif text-5xl font-bold text-[#333333]">
          Discover Handmade Treasures
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-700">
          Explore unique handcrafted products, connect with talented artisans,
          and experience a marketplace built with creativity and care.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/products"
            className="rounded-lg bg-[#A0522D] px-6 py-3 font-medium text-white transition hover:bg-[#8FBC8F]"
          >
            Browse Products
          </Link>

          <Link
            href="/sellers"
            className="rounded-lg border border-[#A0522D] px-6 py-3 font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
          >
            Meet Sellers
          </Link>
        </div>
      </div>
    </main>
  );
}