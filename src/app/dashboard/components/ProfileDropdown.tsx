"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { userData, menuItems } from "../data";

export default function ProfileDropdown() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // TODO: Implement your logout logic here
    setShowMenu(false);
    router.push("/");
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="flex items-center space-x-3 hover:opacity-80 transition-opacity focus:outline-none"
      >
        {/* Avatar */}
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#1DA69B] shadow-md">
          <Image
            src={userData.avatar}
            alt={userData.name}
            fill
            className="object-cover"
          />
        </div>

        {/* User Info - Hidden on mobile */}
        <div className="hidden lg:block text-left">
          <p className="text-sm font-semibold text-gray-800">{userData.name}</p>
          <p className="text-xs text-gray-500">View Profile</p>
        </div>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            showMenu ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showMenu && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />

          {/* Menu */}
          <div className="absolute right-0 mt-3 w-64 bg-white shadow-2xl border border-gray-100 py-2 z-20 animate-fadeIn">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-100">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-semibold text-gray-800">
                  {userData.name}
                </p>
                {/* Notification Icon */}
                <button
                  onClick={() => {
                    setShowMenu(false);
                    router.push("/dashboard/notifications");
                  }}
                  className="relative p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Notifications"
                >
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {/* Notification Badge */}
                  {userData.hasNotifications && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">{userData.email}</p>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setShowMenu(false)}
                >
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.iconPath}
                    />
                  </svg>
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Logout Section */}
            <div className="border-t border-gray-100 pt-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Animation Styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}