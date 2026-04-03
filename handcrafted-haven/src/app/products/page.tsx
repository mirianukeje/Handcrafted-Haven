import { allProducts } from "@/data/sellers";
import ProductCard from "@/components/products/ProductCard";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-[#A0522D]">
            Handcrafted Products
          </h1>
          <p className="mt-2 max-w-2xl font-sans text-gray-700">
            Discover unique handmade creations crafted with care and passion by talented artisans.
          </p>
        </header>

        {allProducts.length === 0 ? (
          <p className="font-sans text-gray-600">
            No products available at the moment.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {allProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}