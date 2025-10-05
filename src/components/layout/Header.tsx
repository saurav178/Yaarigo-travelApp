"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './GlobalLayout';

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <>
<header className="bg-[#3B82F6] text-white fixed top-0 left-0 w-full z-50 rounded-none" style={{ borderTopLeftRadius: '0 !important' }}>
      <div className="w-full py-4 px-3 rounded-none">
        <div className="flex items-center justify-between">
          {/* Left side - Travio logo */}
          <div className="flex items-center px-1 text-4xl font-bold ">
              Travio
          </div>

          {/* Center - Navigation links - visible only after login */}
          {isLoggedIn && (
            <nav className="flex-1 flex justify-start space-x-15 items-center ml-45">
              <Link href="/" className="text-lg hover:text-blue-200 hover:underline transition-colors">
                Explore
              </Link>
              <Link href="/trips" className="text-lg hover:text-blue-200 hover:underline transition-colors">
                My Trips
              </Link>
              <Link href="/community" className="text-lg hover:text-blue-200 hover:underline transition-colors">
                Community
              </Link>
              <Link href="/essentials" className="text-lg hover:text-blue-200 hover:underline transition-colors flex items-center">
                Nearby Essentials
                </Link>
                <div className="relative ml-28">
                  <input
                    type="text"
                    placeholder="find your next trips , people...."
                    className="w-72 py-2 pl-10 pr-4 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    suppressHydrationWarning={true}
                    onClick={(e) => e.stopPropagation()}
                  />
                  <svg className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              
            </nav>
          )}

          {/* Right side - Notification bell and profile icon */}
          {isLoggedIn && (
            <div className="flex items-center space-x-6 pr-4">
              {/* Notification Bell Icon */}
              <button aria-label="Notifications" className="relative focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white hover:text-blue-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Optional: Notification badge */}
                <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
              </button>

              {/* Profile Icon */}
              <div className="relative">
                <button aria-label="Profile" className="focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-full bg-white text-black hover:text-blue-800" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10 overflow-hidden transition-all duration-300 ease-in-out ${dropdownOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                  <button
                    onClick={() => { router.push('/profile'); setDropdownOpen(false); }}
                    className="flex items-center px-4 py-2 mb-2 last:mb-0 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 w-full text-left bg-white"
                    style={{ backgroundColor: 'white' }}
                  >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 rounded-full bg-white text-black hover:text-blue-800" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                    Profile
                  </button>
                  <button
                    onClick={() => { router.push('/settings'); setDropdownOpen(false); }}
                    className="flex items-center px-4 py-2 mb-2 last:mb-0 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 w-full text-left bg-white"
                    style={{ backgroundColor: 'white' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4 text-gray-600" viewBox="0 0 50 50" fill="currentColor" stroke="none" strokeWidth={0}>
                      <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"></path>
                    </svg>
                    Settings
                  </button>
                  <button
                    onClick={() => { setIsLoggedIn(false); router.push('/'); setDropdownOpen(false); }}
                    className="flex items-center px-4 py-2 mb-2 last:mb-0 text-sm text-red-600 hover:text-red-800 hover:bg-blue-50 hover:text-blue-700 w-full text-left bg-white"
                    style={{ backgroundColor: 'white' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
    </>
  );
};

export default Header;
