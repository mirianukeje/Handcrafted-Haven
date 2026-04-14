export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ReviewForm from "@/components/reviews/ReviewForm";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params;

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      seller: true,
      reviews: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

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

  const reviewCount = product.reviews.length;
  const averageRating =
    reviewCount > 0
      ? product.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : null;

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
              src={product.image || ""}
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
                href={`/sellers/${product.seller.username}`}
                className="font-medium text-[#A0522D] hover:underline"
              >
                {product.seller.name}
              </Link>
            </p>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <span className="rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-800">
                {product.category}
              </span>
              {product.material ? (
                <span className="rounded-full bg-stone-100 px-4 py-2 font-semibold text-stone-700">
                  {product.material}
                </span>
              ) : null}
            </div>

            <p className="mt-6 text-lg leading-8 text-gray-700">
              {product.description}
            </p>

            <p className="mt-8 text-3xl font-bold text-[#A0522D]">
              ${product.price}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="rounded-full bg-amber-100 px-4 py-2 font-semibold text-amber-800">
                {averageRating ? `${averageRating.toFixed(1)} / 5` : "No ratings yet"}
              </div>
              <p>{reviewCount} review{reviewCount === 1 ? "" : "s"}</p>
            </div>

            <div className="mt-8 flex gap-4">
              <button className="rounded-lg bg-[#A0522D] px-6 py-3 font-medium text-white transition hover:bg-[#8FBC8F]">
                Add to Cart
              </button>

              <Link
                href={`/sellers/${product.seller.username}`}
                className="rounded-lg border border-[#A0522D] px-6 py-3 font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
              >
                Visit Seller
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-[#A0522D]">
                  Buyer Reviews
                </p>
                <h2 className="mt-2 font-serif text-3xl font-bold text-[#333333]">
                  What buyers are saying
                </h2>
              </div>
              {averageRating ? (
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#A0522D]">
                    {averageRating.toFixed(1)}
                  </p>
                  <p className="text-sm text-gray-500">Average rating</p>
                </div>
              ) : null}
            </div>

            {product.reviews.length === 0 ? (
              <div className="mt-6 rounded-2xl bg-stone-50 p-6 text-sm text-gray-600">
                No reviews yet. Be the first buyer to share feedback on this product.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {product.reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-stone-200 p-5"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {review.buyerName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Intl.DateTimeFormat("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }).format(review.createdAt)}
                        </p>
                      </div>
                      <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
                        {review.rating} / 5
                      </div>
                    </div>
                    <p className="mt-4 text-base leading-7 text-gray-700">
                      {review.comment}
                    </p>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-2xl bg-white p-8 shadow-lg">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#A0522D]">
              Write a Review
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[#333333]">
              Share your experience
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Buyers can leave a review after receiving their handmade item.
            </p>

            <div className="mt-6">
              <ReviewForm productId={product.id} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
