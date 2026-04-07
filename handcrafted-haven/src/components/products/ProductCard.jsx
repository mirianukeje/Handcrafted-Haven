import Link from "next/link";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <article className="overflow-hidden rounded-lg bg-[#F5DEB3] shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-60 w-full overflow-hidden">
        <img
          src={product.image || ""}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg font-semibold text-[#333333]">
          {product.title}
        </h3>
        <p className="mt-2 font-sans text-sm text-gray-700">
          {product.description}
        </p>
        <p className="mt-2 text-sm text-gray-500">
          by {product.sellerName}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-[#A0522D]">
            ${product.price}
          </p>
          <Link
            href={`/products/${product.id}`}
            className="rounded-lg bg-[#A0522D] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8FBC8F]"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}