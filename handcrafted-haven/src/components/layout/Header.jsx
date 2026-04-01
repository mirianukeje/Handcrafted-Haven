// components/layout/Header.jsx
"use client";
import { useState } from "react";
import { Merriweather } from "next/font/google";

// Initialize Merriweather locally
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="shadow-md bg-white">
      <div className="flex justify-between items-center px-6 py-4">
        <h1 className={`${merriweather.className} text-2xl text-[#A0522D]`}>
          Handcrafted Haven
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-[#8FBC8F]">Home</a>
          <a href="#" className="hover:text-[#8FBC8F]">Products</a>
          <a href="#" className="hover:text-[#8FBC8F]">Sellers</a>
          <a href="#" className="hover:text-[#8FBC8F]">About</a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
          aria-label="Toggle Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-3">
          <a href="#" className="block hover:text-[#8FBC8F]">Home</a>
          <a href="#" className="block hover:text-[#8FBC8F]">Products</a>
          <a href="#" className="block hover:text-[#8FBC8F]">Sellers</a>
          <a href="#" className="block hover:text-[#8FBC8F]">About</a>
          <button className="w-full btn-primary">Sign In</button>
        </div>
      )}
    </header>
  );
}