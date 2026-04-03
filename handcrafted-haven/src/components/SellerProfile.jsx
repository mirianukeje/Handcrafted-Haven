import { sellers } from "@/data/sellers";
import ProductCard from "./products/ProductCard";

export default function SellerProfile({ username }) {
  const seller = sellers.find((s) => s.username === username);

  if (!seller) {
    return (
      <main className="min-h-screen bg-stone-50 px-4 py-12">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Seller not found</h1>
          <p className="mt-2 text-gray-600">
            We could not find the seller profile you requested.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-50 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="h-28 bg-gradient-to-r from-amber-700 via-orange-500 to-amber-300 sm:h-32" />

          <div className="px-5 pt-6 pb-8 sm:px-8">
            <div className="mt-2 flex flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-end">
                <img
                  src={seller.image}
                  alt={seller.name}
                  className="h-20 w-20 rounded-full bg-stone-100 object-cover shadow-md sm:h-24 sm:w-24"
                />

                <div className="text-center md:text-left">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                    Artisan Profile
                  </p>
                  <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {seller.name}
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                    {seller.bio}
                  </p>
                </div>
              </div>

              <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                {seller.products.length} Products
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              <div className="rounded-2xl bg-stone-50 p-6 lg:col-span-2">
                <h2 className="text-2xl font-semibold text-gray-900">My Story</h2>
                <p className="mt-3 text-sm leading-7 text-gray-700 sm:text-base">
                  {seller.story}
                </p>
              </div>

              <div className="rounded-2xl border border-stone-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900">Craft Values</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-gray-600">
                  <li>• Handmade with attention to detail</li>
                  <li>• Sustainable and thoughtful materials</li>
                  <li>• Unique pieces with personal character</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-700">
                Collection
              </p>
              <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                Featured Products
              </h2>
            </div>
            <p className="text-sm text-gray-500">
              A curated selection of handmade items.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {seller.products.map((product) => (
              <ProductCard key={product.id} product={{ ...product, sellerName: seller.name }} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}