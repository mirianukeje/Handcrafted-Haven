import Link from "next/link";
import { requireSellerSession } from "@/lib/auth";

export default async function SellerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { seller } = await requireSellerSession();

  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
            Seller Dashboard
          </p>
          <h1 className="mt-3 text-2xl font-bold text-stone-900">{seller.name}</h1>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Manage your public artisan profile and product listings.
          </p>

          <nav className="mt-8 space-y-2">
            <Link
              href="/seller/dashboard"
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-[#A0522D]"
            >
              Overview
            </Link>
            <Link
              href="/seller/dashboard/profile"
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-[#A0522D]"
            >
              Edit Profile
            </Link>
            <Link
              href="/seller/dashboard/products/new"
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-[#A0522D]"
            >
              Add Product
            </Link>
            <Link
              href={`/sellers/${seller.username}`}
              className="block rounded-2xl px-4 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 hover:text-[#A0522D]"
            >
              View Public Store
            </Link>
          </nav>
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}
