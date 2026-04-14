import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { createProduct } from "@/app/seller/actions";
import { requireSellerSession } from "@/lib/auth";

export default async function NewProductPage() {
  await requireSellerSession("/seller/dashboard/products/new");

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
        New Product
      </p>
      <h2 className="mt-2 text-3xl font-bold text-stone-900">Create listing</h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
        Publish a new handmade item to your existing public storefront.
      </p>

      <form action={createProduct} className="mt-8 space-y-6">
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
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
              placeholder="Home Decor"
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
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
              placeholder="Cotton cord"
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
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            placeholder="/ceramic-mug.jpg"
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
            className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          />
        </div>

        <FormSubmitButton
          idleLabel="Create Product"
          pendingLabel="Creating..."
          className="rounded-xl bg-[#A0522D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513] disabled:cursor-not-allowed disabled:opacity-70"
        />
      </form>
    </div>
  );
}
