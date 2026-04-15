import Link from "next/link";
import { redirect } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";
import { getAuthSession } from "@/lib/auth";

export default async function SignUpPage() {
  const session = await getAuthSession();

  if (session?.user?.sellerId) {
    redirect("/seller/dashboard");
  }

  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="rounded-[2rem] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
            Become a Seller
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold text-stone-900">
            Open your handcrafted storefront.
          </h1>
          <p className="mt-4 text-base leading-7 text-stone-600">
            Create your seller account to publish products, shape your artisan
            profile, and manage everything from a private dashboard.
          </p>

          <div className="mt-8 space-y-4 rounded-[1.75rem] bg-stone-50 p-6">
            <div>
              <h2 className="text-lg font-semibold text-stone-900">
                What you get
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                A public seller page, product listings in the marketplace, and
                private management pages protected by your email and password.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-stone-900">
                After registration
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Sign in with the account you just created, then complete your
                profile story, image, and first listings from the dashboard.
              </p>
            </div>
          </div>

          <p className="mt-6 text-sm text-stone-600">
            Want to browse first?{" "}
            <Link href="/sellers" className="font-semibold text-[#A0522D] hover:underline">
              Explore current sellers
            </Link>
          </p>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
              Register
            </p>
            <h2 className="mt-2 text-3xl font-bold text-stone-900">
              Create your seller account
            </h2>
          </div>

          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
