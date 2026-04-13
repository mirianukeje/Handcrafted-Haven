"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/auth/SignOutButton";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const isSignedIn = Boolean(session?.user?.sellerId);

  const linkClassName = "transition hover:text-[#8FBC8F]";
  const mobileLinkClassName = "block py-2 hover:text-[#8FBC8F]";

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-serif text-2xl font-bold text-[#A0522D]"
        >
          Handcrafted Haven
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/" className={linkClassName}>
            Home
          </Link>
          <Link href="/products" className={linkClassName}>
            Products
          </Link>
          <Link href="/sellers" className={linkClassName}>
            Sellers
          </Link>
          <Link href="/about" className={linkClassName}>
            About
          </Link>

          {isSignedIn ? (
            <>
              <Link
                href="/seller/dashboard"
                className="rounded-lg border border-[#A0522D] px-4 py-2 font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
              >
                Dashboard
              </Link>
              <SignOutButton className="rounded-lg bg-[#A0522D] px-4 py-2 text-white transition hover:bg-[#8b4513]" />
            </>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-lg bg-[#A0522D] px-4 py-2 text-white transition hover:bg-[#8b4513]"
            >
              Sign In
            </Link>
          )}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-lg font-semibold text-[#A0522D] md:hidden"
          aria-label="Toggle Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        className={`overflow-hidden bg-white shadow-md transition-all duration-300 md:hidden ${
          open ? "max-h-[28rem] px-6 py-4" : "max-h-0"
        }`}
      >
        <Link href="/" className={mobileLinkClassName} onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link
          href="/products"
          className={mobileLinkClassName}
          onClick={() => setOpen(false)}
        >
          Products
        </Link>
        <Link
          href="/sellers"
          className={mobileLinkClassName}
          onClick={() => setOpen(false)}
        >
          Sellers
        </Link>
        <Link href="/about" className={mobileLinkClassName} onClick={() => setOpen(false)}>
          About
        </Link>

        {isSignedIn ? (
          <div className="mt-4 space-y-3">
            <Link
              href="/seller/dashboard"
              className="block w-full rounded-lg border border-[#A0522D] px-4 py-2 text-center font-medium text-[#A0522D] transition hover:bg-[#A0522D] hover:text-white"
              onClick={() => setOpen(false)}
            >
              Dashboard
            </Link>
            <SignOutButton className="w-full rounded-lg bg-[#A0522D] px-4 py-2 text-white transition hover:bg-[#8b4513]" />
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="mt-4 block w-full rounded-lg bg-[#A0522D] px-4 py-2 text-center text-white transition hover:bg-[#8b4513]"
            onClick={() => setOpen(false)}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
