"use client";

import { createContext, useContext, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within GlobalLayout");
  }
  return context;
};

export default function GlobalLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <Header />
      {children}
      <Footer />
    </AuthContext.Provider>
  );
}
