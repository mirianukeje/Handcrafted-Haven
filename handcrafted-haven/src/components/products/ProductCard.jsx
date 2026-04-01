export default function ProductCard({ product }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="h-40 w-full overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-2xl font-bold text-amber-700">${product.price}</p>

          <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-700">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}