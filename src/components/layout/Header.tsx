import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-[#3B82F6] text-white fixed top-0 left-0 w-full z-50">
      <div className="w-full py-4 px-3">
        <div className="flex items-center justify-between">
          {/* Left side - Travio logo */}
          <div className="flex items-center px-1 text-4xl font-bold italic">
              Travio
          </div>

          {/* Center - Navigation links 
          <nav className="flex-1 flex justify-center space-x-15">
            <Link href="/" className="text-lg hover:text-blue-200 hover:underline transition-colors">
              Explore
            </Link>
            <Link href="/trips" className="text-lg hover:text-blue-200 hover:underline transition-colors">
              My Trips
            </Link>
            <Link href="/community" className="text-lg hover:text-blue-200 hover:underline transition-colors">
              Community
            </Link>
            <Link href="/essentials" className="text-lg hover:text-blue-200 hover:underline transition-colors">
              Nearby Essentials
            </Link>
          </nav>
          */} 

          {/* Right side - Search bar 
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="find your fav places , people...."
                className="pl-10 pr-4 py-2 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                suppressHydrationWarning={true}
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" suppressHydrationWarning={true}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          */}
        </div>
      </div>
    </header>
  );
};

export default Header;
