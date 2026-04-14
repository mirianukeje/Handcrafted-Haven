import { notFound } from "next/navigation";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { deleteProduct, updateProduct } from "@/app/seller/actions";
import { requireSellerSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { seller } = await requireSellerSession("/seller/dashboard");
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id,
      sellerId: seller.id,
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
          Edit Product
        </p>
        <h2 className="mt-2 text-3xl font-bold text-stone-900">{product.title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Update your listing details. The public product and seller pages will refresh after save.
        </p>

        <form action={updateProduct} className="mt-8 space-y-6">
          <input type="hidden" name="productId" value={product.id} />

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Product title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={product.title}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                type="text"
                required
                defaultValue={product.category}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                required
                defaultValue={product.price}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
              />
            </div>

            <div>
              <label
                htmlFor="material"
                className="mb-2 block text-sm font-semibold text-stone-700"
              >
                Material
              </label>
              <input
                id="material"
                name="material"
                type="text"
                defaultValue={product.material ?? ""}
                className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Image path
            </label>
            <input
              id="image"
              name="image"
              type="text"
              defaultValue={product.image ?? ""}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={7}
              defaultValue={product.description ?? ""}
              className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            />
          </div>

          <FormSubmitButton
            idleLabel="Save Changes"
            pendingLabel="Saving..."
            className="rounded-xl bg-[#A0522D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513] disabled:cursor-not-allowed disabled:opacity-70"
          />
        </form>
      </section>

      <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
          Danger Zone
        </p>
        <h3 className="mt-2 text-2xl font-bold text-stone-900">Delete listing</h3>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          This removes the product from your dashboard and the public marketplace.
        </p>
        <form action={deleteProduct} className="mt-6">
          <input type="hidden" name="productId" value={product.id} />
          <button
            type="submit"
            className="rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Delete Product
          </button>
        </form>
      </section>
    </div>
  );
}
