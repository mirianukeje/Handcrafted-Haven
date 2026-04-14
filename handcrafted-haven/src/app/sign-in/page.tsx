import Link from "next/link";
import { redirect } from "next/navigation";
import SignInForm from "@/components/auth/SignInForm";
import { getAuthSession } from "@/lib/auth";

type SignInPageProps = {
  searchParams: Promise<{
    callbackUrl?: string;
    email?: string;
    registered?: string;
  }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const session = await getAuthSession();

  if (session?.user?.sellerId) {
    redirect("/seller/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const callbackUrl = resolvedSearchParams.callbackUrl || "/seller/dashboard";
  const defaultEmail = resolvedSearchParams.email || "";
  const wasRegistered = resolvedSearchParams.registered === "1";

  return (
    <main className="min-h-screen bg-[#FFF8F0] px-6 py-16">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[2rem] bg-gradient-to-br from-[#A0522D] via-[#B86B41] to-[#E8C07D] p-8 text-white shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Seller Access
          </p>
          <h1 className="mt-4 font-serif text-4xl font-bold leading-tight">
            Manage your handcrafted storefront.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-white/85">
            Sign in to update your artisan profile, publish new products, and
            keep your collection current without touching the public browsing
            experience.
          </p>

          <div className="mt-8 rounded-3xl bg-white/10 p-6 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Demo seller accounts</h2>
            <div className="mt-4 space-y-3 text-sm">
              <p>
                <span className="font-semibold">Liva:</span>{" "}
                <span className="font-mono">liva@handcraftedhaven.test</span>
              </p>
              <p>
                <span className="font-semibold">Shared:</span>{" "}
                <span className="font-mono">shared@handcraftedhaven.test</span>
              </p>
              <p>
                <span className="font-semibold">Password:</span>{" "}
                <span className="font-mono">demo12345</span>
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#A0522D]">
              Sign In
            </p>
            <h2 className="mt-2 text-3xl font-bold text-stone-900">
              Seller dashboard
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Use your seller email and password to access the private dashboard.
            </p>
          </div>

          {wasRegistered ? (
            <p className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Seller account created. Sign in to open your dashboard.
            </p>
          ) : null}

          <SignInForm callbackUrl={callbackUrl} defaultEmail={defaultEmail} />

          <p className="mt-6 text-sm text-stone-600">
            Looking for the public marketplace?{" "}
            <Link href="/products" className="font-semibold text-[#A0522D] hover:underline">
              Browse products
            </Link>
          </p>

          <p className="mt-3 text-sm text-stone-600">
            Need an account?{" "}
            <Link href="/sign-up" className="font-semibold text-[#A0522D] hover:underline">
              Register as a seller
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
