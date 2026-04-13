import Link from "next/link";
import SignOutButton from "@/components/auth/SignOutButton";
import { requireSellerSession } from "@/lib/auth";
import { deleteProduct } from "@/app/seller/actions";

export default async function SellerDashboardPage() {
  const { seller } = await requireSellerSession("/seller/dashboard");

  const productCount = seller.products.length;
  const startingPrice =
    productCount > 0
      ? Math.min(...seller.products.map((product) => product.price))
      : null;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-gradient-to-br from-[#8B4513] via-[#A0522D] to-[#E8C07D] p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
              Overview
            </p>
            <h2 className="mt-3 text-4xl font-bold">{seller.name}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85">
              {seller.bio ||
                "Add a short bio to tell buyers about your craft and materials."}
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-white/12 p-5 backdrop-blur-sm">
            <p className="text-sm text-white/70">Signed in as</p>
            <p className="mt-1 font-medium">{seller.user.email}</p>
            <SignOutButton className="mt-4 rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10" />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A0522D]">
            Public Store
          </p>
          <p className="mt-3 text-3xl font-bold text-stone-900">{productCount}</p>
          <p className="mt-2 text-sm text-stone-600">Active product listings</p>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A0522D]">
            Starting Price
          </p>
          <p className="mt-3 text-3xl font-bold text-stone-900">
            {startingPrice ? `$${startingPrice.toFixed(2)}` : "--"}
          </p>
          <p className="mt-2 text-sm text-stone-600">Lowest current listing</p>
        </div>

        <div className="rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#A0522D]">
            Public URL
          </p>
          <p className="mt-3 text-lg font-bold text-stone-900">
            /sellers/{seller.username}
          </p>
          <p className="mt-2 text-sm text-stone-600">Your storefront route</p>
        </div>
      </section>

      <section className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
                Products
              </p>
              <h3 className="mt-2 text-2xl font-bold text-stone-900">
                Manage listings
              </h3>
            </div>
            <Link
              href="/seller/dashboard/products/new"
              className="rounded-xl bg-[#A0522D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513]"
            >
              Add Product
            </Link>
          </div>

          {seller.products.length === 0 ? (
            <div className="mt-6 rounded-[1.5rem] bg-stone-50 p-8 text-center text-stone-600">
              No products yet. Create your first listing to populate the storefront.
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              {seller.products.map((product) => (
                <article
                  key={product.id}
                  className="flex flex-col gap-4 rounded-[1.5rem] border border-stone-200 p-5 lg:flex-row lg:items-center lg:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.image || "/wood.jpg"}
                      alt={product.title}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />
                    <div>
                      <h4 className="text-lg font-semibold text-stone-900">
                        {product.title}
                      </h4>
                      <p className="mt-1 text-sm text-stone-600">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="mt-2 max-w-xl text-sm leading-6 text-stone-500">
                        {product.description || "No description yet."}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-[#A0522D] hover:text-[#A0522D]"
                    >
                      View
                    </Link>
                    <Link
                      href={`/seller/dashboard/products/${product.id}/edit`}
                      className="rounded-xl border border-[#A0522D] px-4 py-2 text-sm font-semibold text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
                    >
                      Edit
                    </Link>
                    <form action={deleteProduct}>
                      <input type="hidden" name="productId" value={product.id} />
                      <button
                        type="submit"
                        className="rounded-xl bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-stone-700"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
              Profile Summary
            </p>
            <h3 className="mt-2 text-2xl font-bold text-stone-900">Public details</h3>
            <dl className="mt-6 space-y-4 text-sm text-stone-600">
              <div>
                <dt className="font-semibold text-stone-900">Display name</dt>
                <dd className="mt-1">{seller.name}</dd>
              </div>
              <div>
                <dt className="font-semibold text-stone-900">Username</dt>
                <dd className="mt-1">{seller.username}</dd>
              </div>
              <div>
                <dt className="font-semibold text-stone-900">Bio</dt>
                <dd className="mt-1">
                  {seller.bio || "No public bio configured."}
                </dd>
              </div>
            </dl>

            <Link
              href="/seller/dashboard/profile"
              className="mt-6 inline-flex rounded-xl bg-[#A0522D] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513]"
            >
              Edit Profile
            </Link>
          </section>

          <section className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
              Store Story
            </p>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {seller.story ||
                "Add your maker story so buyers understand the process behind your products."}
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
