"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useModal } from '@/context/ModalContext'; // Add this import

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { openModal } = useModal(); // Add this hook

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroPage = pathname === "/" || pathname === "/landingpage";

  // Update handleLogin to use modal
  const handleLogin = () => {
    openModal('login'); // Open login modal instead of navigating
  };

  // Add handleSignUp for the signup button
  const handleSignUp = () => {
    openModal('register'); // Open register modal
  };

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
          <Link href="/my-trips">About Us</Link>
          <Link href="/explore">Explore Trips</Link>
          <Link href="/community">How it Works</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-3">
          {/* Login Button */}
          <button
            onClick={handleLogin}
            className={`text-sm px-4 py-2 rounded-full shadow-md transition font-semibold ${
              isHeroPage && !isScrolled
                ? "bg-white text-[#0073B9] hover:bg-gray-100"
                : "bg-[#1D4350] hover:bg-[#1DA69B] text-white"
            }`}
          >
            Log In
          </button>
          
        </div>
      </div>
    </header>
  );
}