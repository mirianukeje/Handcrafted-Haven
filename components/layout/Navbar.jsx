"use client";
import { useState } from "react";
import { Merriweather } from "next/font/google";

// Google Font for headings
const merriweather = Merriweather({ subsets: ["latin"], weight: ["400", "700"] });

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="shadow-md bg-white fixed w-full z-50">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        {/* Logo */}
        <h1 className={`${merriweather.className} text-2xl text-[#A0522D] font-bold`}>
          Handcrafted Haven
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 items-center">
          <a href="#" className="hover:text-[#8FBC8F] transition">Home</a>
          <a href="#" className="hover:text-[#8FBC8F] transition">Products</a>
          <a href="#" className="hover:text-[#8FBC8F] transition">Sellers</a>
          <a href="#" className="hover:text-[#8FBC8F] transition">About</a>
          <button className="btn-primary">Sign In</button>
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
          aria-label="Toggle Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-96 py-4 px-6" : "max-h-0"
        }`}
      >
        <a href="#" className="block py-2 hover:text-[#8FBC8F]">Home</a>
        <a href="#" className="block py-2 hover:text-[#8FBC8F]">Products</a>
        <a href="#" className="block py-2 hover:text-[#8FBC8F]">Sellers</a>
        <a href="#" className="block py-2 hover:text-[#8FBC8F]">About</a>
        <button className="w-full btn-primary mt-4">Sign In</button>
      </div>
    </header>
  );
}