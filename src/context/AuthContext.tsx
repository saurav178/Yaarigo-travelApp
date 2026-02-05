

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, Organization } from '../types/auth';
import { authService } from '../services/auth-service';
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [state, setState] = useState<AuthState>({
    user: null,
    organization: [], // Error 1 fix: Initial state add ki
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshUser = async () => {
  try {
    const userData: User = await authService.getMe();
    
    // Yahan hum Organization type ka fayda utha sakte hain
    const orgs: Organization[] = userData.organizations || []; 

    setState({ 
      user: userData, 
      organization: orgs, 
      isAuthenticated: true, 
      isLoading: false 
    });
  } catch {
    setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
  }
};
  useEffect(() => {
    refreshUser();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    await authService.login(credentials);
    const userData: User = await authService.getMe();
    
    setState({ 
      user: userData, 
      organization: userData.organizations || [], // Error 3 fix
      isAuthenticated: true, 
      isLoading: false 
    });
  };

  const register = async (data: RegisterData) => {
    await authService.register(data);
  };

  // const logout = () => {
  //   setState({ 
  //     user: null, 
  //     organization: [], // Error 4 fix
  //     isAuthenticated: false, 
  //     isLoading: false 
  //   });
  // };

  const logout = async () => {
  try {
    await authService.logout(); // Server side logout
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    // Local state hamesha clear karein chahe API fail ho ya pass
    setState({ 
      user: null, 
      organization: [], 
      isAuthenticated: false, 
      isLoading: false 
    });
    // window.location.href = "/login"; 
    router.push("/login");
  router.refresh();
  }
};
  return (
    <AuthContext.Provider value={{ ...state, login, register, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};