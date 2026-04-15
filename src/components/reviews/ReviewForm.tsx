"use client";

import { useActionState } from "react";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { createReview } from "@/app/products/[id]/actions";

const initialState = {
  error: "",
  success: "",
};

function extractError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to submit your review.";
}

export default function ReviewForm({ productId }: { productId: string }) {
  const [state, formAction] = useActionState(
    async (_previousState: typeof initialState, formData: FormData) => {
      try {
        await createReview(formData);
        return {
          error: "",
          success: "Thanks. Your review has been posted.",
        };
      } catch (error) {
        return {
          error: extractError(error),
          success: "",
        };
      }
    },
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="productId" value={productId} />

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="buyerName"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Your name
          </label>
          <input
            id="buyerName"
            name="buyerName"
            type="text"
            required
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          />
        </div>

        <div>
          <label
            htmlFor="buyerEmail"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Email
          </label>
          <input
            id="buyerEmail"
            name="buyerEmail"
            type="email"
            required
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="rating"
          className="mb-2 block text-sm font-semibold text-stone-700"
        >
          Rating
        </label>
        <select
          id="rating"
          name="rating"
          required
          defaultValue="5"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
        >
          <option value="5">5 - Excellent</option>
          <option value="4">4 - Very good</option>
          <option value="3">3 - Good</option>
          <option value="2">2 - Fair</option>
          <option value="1">1 - Poor</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-semibold text-stone-700"
        >
          Review
        </label>
        <textarea
          id="comment"
          name="comment"
          rows={5}
          required
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          placeholder="Share what you liked about the product."
        />
      </div>

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      {state.success ? (
        <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {state.success}
        </p>
      ) : null}

      <FormSubmitButton
        idleLabel="Submit Review"
        pendingLabel="Posting Review..."
        className="rounded-xl bg-[#A0522D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#8b4513] disabled:cursor-not-allowed disabled:opacity-70"
      />
    </form>
  );
}
