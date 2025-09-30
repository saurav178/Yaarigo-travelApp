'use client';

import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Main Header */}
      <Header />

      {/* Sidebar hidden for now */}
      {/* <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} /> */}

      {/* Sidebar toggle button hidden for now */}
      {/* <div className="fixed top-20 left-4 z-30">
        <button
          onClick={toggleSidebar}
          className="bg-white p-3 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          aria-label="Open sidebar menu"
        >
          <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div> */}

      {/* Main Content Area */}
      <main className="flex-1 pt-4">
        {/* Page Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GlobalLayout;
