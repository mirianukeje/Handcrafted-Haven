"use client";

import { useActionState } from "react";
import Link from "next/link";
import FormSubmitButton from "@/components/forms/FormSubmitButton";
import { registerSeller } from "@/app/sign-up/actions";

const initialState = {
  error: "",
};

function extractError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return "Unable to create your seller account.";
}

export default function RegisterForm() {
  const [state, formAction] = useActionState(
    async (_previousState: typeof initialState, formData: FormData) => {
      try {
        await registerSeller(formData);
        return initialState;
      } catch (error) {
        return {
          error: extractError(error),
        };
      }
    },
    initialState
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Seller name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            placeholder="Amina Crafts"
          />
        </div>

        <div>
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-semibold text-stone-700"
          >
            Public username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            required
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
            placeholder="amina-crafts"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-stone-700"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          placeholder="seller@example.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-stone-700"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          placeholder="At least 8 characters"
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
          rows={4}
          className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition focus:border-[#A0522D] focus:ring-2 focus:ring-[#A0522D]/20"
          placeholder="Tell buyers what you make."
        />
      </div>

      {state.error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : null}

      <FormSubmitButton
        idleLabel="Create Seller Account"
        pendingLabel="Creating Account..."
        className="w-full rounded-xl bg-[#A0522D] px-4 py-3 font-semibold text-white transition hover:bg-[#8b4513] disabled:cursor-not-allowed disabled:opacity-70"
      />

      <p className="text-sm text-stone-600">
        Already have a seller account?{" "}
        <Link href="/sign-in" className="font-semibold text-[#A0522D] hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
}
