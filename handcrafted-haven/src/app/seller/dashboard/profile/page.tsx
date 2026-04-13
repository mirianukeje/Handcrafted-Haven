import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { updateSellerProfile } from "@/app/seller/actions";
import { requireSellerSession } from "@/lib/auth";

export default async function SellerProfileSettingsPage() {
  const { seller } = await requireSellerSession("/seller/dashboard/profile");

  return (
    <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
        Profile
      </p>
      <h2 className="mt-2 text-3xl font-bold text-stone-900">
        Edit public seller profile
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
        These details appear on your public seller page and across product listings.
      </p>

      <form action={updateSellerProfile} className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Display name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={seller.name}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-semibold text-stone-700"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              required
              defaultValue={seller.username}
              className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="image"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Profile image path
          </label>
          <input
            id="image"
            name="image"
            type="text"
            defaultValue={seller.image ?? ""}
            className="w-full rounded-xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            placeholder="/livaprofile.png"
          />
        </div>

        <div>
          <label
            htmlFor="bio"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Short bio
          </label>
          <textarea
            id="bio"
            name="bio"
            rows={3}
            defaultValue={seller.bio ?? ""}
            className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          />
        </div>

        <div>
          <label
            htmlFor="story"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Maker story
          </label>
          <textarea
            id="story"
            name="story"
            rows={8}
            defaultValue={seller.story ?? ""}
            className="w-full rounded-2xl border border-stone-300 px-4 py-3 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          />
        </div>

        <FormSubmitButton
          idleLabel="Save Profile"
          pendingLabel="Saving..."
          className="rounded-xl bg-[#A0522D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513] disabled:cursor-not-allowed disabled:opacity-70"
        />
      </form>
    </div>
  );
}
