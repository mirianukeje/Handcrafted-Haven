export const dynamic = "force-dynamic";

import Link from "next/link";
import ProductCard from "@/components/products/ProductCard";
import { prisma } from "@/lib/prisma";

type ProductsPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
    seller?: string;
    material?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
  }>;
};

type FormattedProduct = {
  id: string;
  title: string;
  category: string;
  material: string | null;
  description: string | null;
  price: number;
  image: string | null;
  sellerName: string;
  sellerUsername: string;
};

function parseNumber(value?: string) {
  if (!value) {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = await searchParams;
  const query = filters.q?.trim() || "";
  const category = filters.category?.trim() || "";
  const seller = filters.seller?.trim() || "";
  const material = filters.material?.trim() || "";
  const minPrice = parseNumber(filters.minPrice);
  const maxPrice = parseNumber(filters.maxPrice);
  const sort = filters.sort || "newest";

  const where = {
    ...(query
      ? {
          OR: [
            { title: { contains: query, mode: "insensitive" as const } },
            { description: { contains: query, mode: "insensitive" as const } },
            { material: { contains: query, mode: "insensitive" as const } },
          ],
        }
      : {}),
    ...(category ? { category } : {}),
    ...(material
      ? {
          material: {
            contains: material,
            mode: "insensitive" as const,
          },
        }
      : {}),
    ...(seller
      ? {
          seller: {
            username: seller,
          },
        }
      : {}),
    ...((minPrice !== undefined || maxPrice !== undefined)
      ? {
          price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
  };

  const orderBy =
    sort === "price-asc"
      ? { price: "asc" as const }
      : sort === "price-desc"
        ? { price: "desc" as const }
        : sort === "name"
          ? { title: "asc" as const }
          : { createdAt: "desc" as const };

  const [products, filterData] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        seller: true,
      },
      orderBy,
    }),
    prisma.product.findMany({
      include: {
        seller: {
          select: {
            username: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const formattedProducts: FormattedProduct[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    category: product.category,
    material: product.material,
    description: product.description,
    price: product.price,
    image: product.image,
    sellerName: product.seller.name,
    sellerUsername: product.seller.username,
  }));

  const categories = [...new Set(filterData.map((product) => product.category))].sort();
  const sellers = [
    ...new Map(
      filterData.map((product) => [
        product.seller.username,
        { username: product.seller.username, name: product.seller.name },
      ])
    ).values(),
  ].sort((a, b) => a.name.localeCompare(b.name));
  const materials = [
    ...new Set(filterData.map((product) => product.material).filter(Boolean)),
  ].sort() as string[];

  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10">
          <h1 className="font-serif text-4xl font-bold text-[#A0522D]">
            Handcrafted Products
          </h1>
          <p className="mt-2 max-w-3xl font-sans text-gray-700">
            Browse the catalog and narrow it by category, seller, material, price range, or keyword to find the right handmade piece faster.
          </p>
        </header>

        <section className="mb-10 rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm">
          <form className="space-y-6">
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
              <div>
                <label htmlFor="q" className="mb-2 block text-sm font-semibold text-stone-700">
                  Search
                </label>
                <input
                  id="q"
                  name="q"
                  type="text"
                  defaultValue={query}
                  placeholder="Search by title, description, or material"
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                />
              </div>

              <div>
                <label htmlFor="category" className="mb-2 block text-sm font-semibold text-stone-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  defaultValue={category}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                >
                  <option value="">All categories</option>
                  {categories.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="seller" className="mb-2 block text-sm font-semibold text-stone-700">
                  Seller
                </label>
                <select
                  id="seller"
                  name="seller"
                  defaultValue={seller}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                >
                  <option value="">All sellers</option>
                  {sellers.map((option) => (
                    <option key={option.username} value={option.username}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="sort" className="mb-2 block text-sm font-semibold text-stone-700">
                  Sort
                </label>
                <select
                  id="sort"
                  name="sort"
                  defaultValue={sort}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                >
                  <option value="newest">Newest first</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]">
              <div>
                <label htmlFor="material" className="mb-2 block text-sm font-semibold text-stone-700">
                  Material
                </label>
                <input
                  id="material"
                  name="material"
                  type="text"
                  list="catalog-materials"
                  defaultValue={material}
                  placeholder="Leather, ceramic, cotton"
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                />
                <datalist id="catalog-materials">
                  {materials.map((option) => (
                    <option key={option} value={option} />
                  ))}
                </datalist>
              </div>

              <div>
                <label htmlFor="minPrice" className="mb-2 block text-sm font-semibold text-stone-700">
                  Min price
                </label>
                <input
                  id="minPrice"
                  name="minPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={filters.minPrice ?? ""}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                />
              </div>

              <div>
                <label htmlFor="maxPrice" className="mb-2 block text-sm font-semibold text-stone-700">
                  Max price
                </label>
                <input
                  id="maxPrice"
                  name="maxPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={filters.maxPrice ?? ""}
                  className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
                />
              </div>

              <div className="flex items-end gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#A0522D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513]"
                >
                  Apply Filters
                </button>
                <Link
                  href="/products"
                  className="rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-700 transition hover:border-[#A0522D] hover:text-[#A0522D]"
                >
                  Reset
                </Link>
              </div>
            </div>
          </form>
        </section>

        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{formattedProducts.length}</span> product{formattedProducts.length === 1 ? "" : "s"}
          </p>
          {(category || seller || material || query || filters.minPrice || filters.maxPrice) ? (
            <p className="text-sm text-gray-500">
              Filters are active on the current catalog view.
            </p>
          ) : null}
        </div>

        {formattedProducts.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="font-sans text-gray-600">
              No products match the current filters. Adjust the catalog filters and try again.
            </p>
          </div>
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
