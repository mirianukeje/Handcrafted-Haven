import Link from "next/link";
import { sellers } from "@/data/sellers";

export default function SellersPage() {
  return (
    <main className="min-h-screen bg-stone-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
            Artisans
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Meet Our Sellers
          </h1>
          <p className="mt-2 text-gray-600">
            Discover talented creators and explore their handcrafted collections.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {sellers.map((seller) => (
            <Link
              key={seller.username}
              href={`/sellers/${seller.username}`}
              className="group rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="h-16 w-16 rounded-full object-cover"
                />

                <div>
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-amber-700">
                    {seller.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {seller.products.length} products
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-600">
                {seller.bio}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}