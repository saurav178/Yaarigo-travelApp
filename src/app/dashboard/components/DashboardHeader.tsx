"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileDropdown from "./ProfileDropdown";
import { navItems } from "../data";

export default function DashboardHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full fixed top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          
          {/* Logo */}
          <Link
            href="/dashboard"
            className="text-2xl font-bold tracking-tight text-[#1D4350] hover:text-[#1DA69B] transition-colors"
          >
            Travio.
          </Link>

          {/* Dashboard Navigation with Pills */}
          <nav className="hidden md:flex items-center space-x-2 bg-gray-100/60 rounded-full p-1.5 backdrop-blur-sm">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.href}
                  href={item.href} 
                  className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-white text-[#1DA69B] shadow-md' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                  }`}
                >
                  <span className={isActive ? 'text-[#1DA69B]' : 'text-gray-400'}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.iconPath} />
                    </svg>
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Section: Notifications + Profile */}
          <div className="flex items-center space-x-4">
            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
}