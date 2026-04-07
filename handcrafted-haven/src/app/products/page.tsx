import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/lib/prisma";

type FormattedProduct = {
  id: string;
  title: string;
  description: string | null;
  price: number;
  image: string | null;
  sellerName: string;
  sellerUsername: string;
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    include: {
      seller: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: FormattedProduct[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    image: product.image,
    sellerName: product.seller.name,
    sellerUsername: product.seller.username,
  }));

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

        {formattedProducts.length === 0 ? (
          <p className="font-sans text-gray-600">
            No products available at the moment.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {formattedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}