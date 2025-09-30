"use client";

import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout = ({ children }: GlobalLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-[80px]">{children}</main>
      <Footer />
    </div>
  );
};

export default GlobalLayout;
