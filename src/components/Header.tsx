"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroPage = pathname === "/" || pathname === "/landing-page";

  return (
    <header
      className={`w-full fixed top-0 z-50 transition-all duration-300 ${
        isHeroPage && !isScrolled
          ? "bg-gradient-to-b from-black/40 to-transparent text-white"
          : "bg-white text-gray-800 shadow-md border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight ${
            isHeroPage && !isScrolled
              ? "text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              : "text-[#1D4350]"
          }`}
        >
          Travio.
        </Link>

        {/* Navigation */}
        <nav
          className={`hidden md:flex items-center space-x-24 text-sm font-medium ${
            isHeroPage && !isScrolled
              ? "text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
              : "text-gray-800"
          }`}
        >
          <Link href="/my-trips" className="hover:text-[#1DA69B] transition">
            About Us
          </Link>
          <Link href="/explore" className="hover:text-[#1DA69B] transition">
            Explore Trips
          </Link>
          {/* <Link href="/nearby" className="hover:text-red-500 transition">
            Nearby Essentials
          </Link> */}
          <Link href="/community" className="hover:text-[#1DA69B] transition">
            How it Works
          </Link>
        </nav>

        {/* Login Button */}
        <Link
          href="/login"
          className={`text-sm px-4 py-2 rounded-full shadow-md transition font-semibold ${
            isHeroPage && !isScrolled
              ? "bg-white text-[#0073B9] hover:bg-gray-100"
              : "bg-[#1D4350] hover:bg-[#1DA69B] text-white"
          }`}
        >
          Log In
        </Link>
      </div>
    </header>
  );
}
