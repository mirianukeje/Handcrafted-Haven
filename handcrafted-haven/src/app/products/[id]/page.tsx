import Link from "next/link";
import { getProductById } from "@/data/sellers";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return (
      <main className="min-h-screen bg-[#FFF8F0] px-6 py-12">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-10 text-center shadow-md">
          <h1 className="font-serif text-3xl font-bold text-[#A0522D]">
            Product not found
          </h1>
          <p className="mt-3 text-gray-600">
            The product you are looking for does not exist.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-lg bg-[#A0522D] px-5 py-3 text-white transition hover:bg-[#8FBC8F]"
          >
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Link
            href="/products"
            className="text-sm font-medium text-[#A0522D] hover:underline"
          >
            ← Back to Products
          </Link>
        </div>

        <div className="grid gap-10 rounded-2xl bg-white p-8 shadow-lg md:grid-cols-2">
          <div className="overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#A0522D]">
              Handmade Product
            </p>

            <h1 className="mt-2 font-serif text-4xl font-bold text-[#333333]">
              {product.title}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              by{" "}
              <Link
                href={`/sellers/${product.sellerUsername}`}
                className="font-medium text-[#A0522D] hover:underline"
              >
                {product.sellerName}
              </Link>
            </p>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              {product.description}
            </p>

            <p className="mt-8 text-3xl font-bold text-[#A0522D]">
              ${product.price}
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-[#A0522D] px-6 py-3 font-medium text-white transition hover:bg-[#8FBC8F]">
                Add to Cart
              </button>

              <Link
                href={`/sellers/${product.sellerUsername}`}
                className="rounded-lg border border-[#A0522D] px-6 py-3 font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
              >
                Visit Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}