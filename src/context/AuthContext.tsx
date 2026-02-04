
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth-service";

interface AuthContextType {
  user: any;
  loading: boolean;
  isAuthenticated: boolean;
  organization: any[];
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    try {
     
      const data = await authService.getMe();
      
      if (data) {
        setUser(data.user || data);
        setIsAuthenticated(true);
      }
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    checkSession();
  }, []);

  const login = async (credentials: any) => {
    setLoading(true);
    try {
      await authService.login(credentials);
      await checkSession(); 
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout(); 
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  return (
<AuthContext.Provider value={{ 
    user, 
    loading, 
    isAuthenticated, 
    organization: user?.organizations || [], 
    login, 
    logout 
  }}>
          {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  console.log("AuthContext:", ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

