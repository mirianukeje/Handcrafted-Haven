"use client";

import { useState } from "react";
import Link from "next/link";
import { Merriweather } from "next/font/google";

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`${merriweather.className} text-2xl font-bold text-[#A0522D]`}
        >
          Handcrafted Haven
        </Link>

        <nav className="hidden items-center space-x-8 md:flex">
          <Link href="/" className="transition hover:text-[#8FBC8F]">
            Home
          </Link>
          <Link href="/products" className="transition hover:text-[#8FBC8F]">
            Products
          </Link>
          <Link href="/sellers" className="transition hover:text-[#8FBC8F]">
            Sellers
          </Link>
          <Link href="/about" className="transition hover:text-[#8FBC8F]">
            About
          </Link>
          <button className="rounded-lg bg-[#A0522D] px-4 py-2 text-white transition hover:bg-[#8b4513]">
            Sign In
          </button>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="text-3xl md:hidden"
          aria-label="Toggle Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`overflow-hidden bg-white shadow-md transition-all duration-300 md:hidden ${
          open ? "max-h-96 px-6 py-4" : "max-h-0"
        }`}
      >
        <Link href="/" className="block py-2 hover:text-[#8FBC8F]">
          Home
        </Link>
        <Link href="/products" className="block py-2 hover:text-[#8FBC8F]">
          Products
        </Link>
        <Link href="/sellers" className="block py-2 hover:text-[#8FBC8F]">
          Sellers
        </Link>
        <Link href="/about" className="block py-2 hover:text-[#8FBC8F]">
          About
        </Link>
        <button className="mt-4 w-full rounded-lg bg-[#A0522D] px-4 py-2 text-white transition hover:bg-[#8b4513]">
          Sign In
        </button>
      </div>
    </header>
  );
}