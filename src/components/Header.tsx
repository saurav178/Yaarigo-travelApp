"use client";

import Link from "next/link";
import { useState, useEffect} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import UserDropdown from "./UserDropdown";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
const { isAuthenticated ,isLoading} = useAuth(); 
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHeroPage = pathname === "/" || pathname === "/landingpage";

  const headerStyles = isHeroPage && !isScrolled
    ? "bg-gradient-to-b from-black/40 to-transparent text-white"
    : "bg-white text-gray-800 shadow-md border-b border-gray-100";

  return (
    <header className={`w-full fixed top-0 z-50 ${headerStyles}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <Link href="/" className="text-xl font-bold tracking-tight">
          Yaarigo<span className={isHeroPage && !isScrolled ? "text-white" : "text-blue-500"}>.</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-12 text-sm font-medium">
          <Link href="/about" className="hover:opacity-70 transition">About Us</Link>
          <Link href="/explore" className="hover:opacity-70 transition">Explore Trips</Link>
          <Link href="/how-it-works" className="hover:opacity-70 transition">How it Works</Link>
        </nav>

        <div className="flex items-center space-x-3 min-w-[100px] justify-end">
          {isLoading ? (
            <div className="h-9 w-24 bg-gray-200/20 animate-pulse rounded-full" />
          ) : isAuthenticated ? (
            <UserDropdown isHeroPage={isHeroPage} isScrolled={isScrolled} />
          ) : (
            <button
              onClick={() => router.push("/login")}
              className={`text-sm px-6 py-2.5 rounded-full shadow-sm transition font-bold transform active:scale-95 ${
                isHeroPage && !isScrolled
                  ? "bg-white text-[#1D4350] hover:bg-gray-100"
                  : "bg-[#1D4350] text-white hover:bg-[#15323b]"
              }`}
            >
              Log In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}