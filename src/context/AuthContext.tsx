"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  AuthState,
  LoginCredentials,
  RegisterData,
  RegisterOrgPayload,
  RegisterOrgResponse,
  User,
} from "../types/auth";
import { authService } from "../services/auth-service";
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
  registerOrganization: (
    data: RegisterOrgPayload
  ) => Promise<RegisterOrgResponse>;
  switchOrganization: (orgId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [state, setState] = useState<AuthState>({
    user: null,
    organization: [],
    isAuthenticated: false,
    isLoading: true,
  });

  /**
   * Fetch authenticated user from backend
   */
  const refreshUser = async (): Promise<void> => {
    try {
      const userData: User | null = await authService.getMe();

      if (!userData) {
        setState({
          user: null,
          organization: [],
          isAuthenticated: false,
          isLoading: false,
        });
        return;
      }

      setState({
        user: userData,
        organization: userData.organizations ?? [],
        isAuthenticated: true,
        isLoading: false,
      });
    } catch {
      setState({
        user: null,
        organization: [],
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  /**
   * Initial session check
   */
  useEffect(() => {
    refreshUser();
  }, []);

  /**
   * Login
   */
  const login = async (
    credentials: LoginCredentials
  ): Promise<void> => {
    await authService.login(credentials);
    await refreshUser();
  };

  /**
   * Register user
   */
  const register = async (data: RegisterData): Promise<void> => {
    await authService.register(data);
  };

  /**
   * Logout
   */
  const logout = async (): Promise<void> => {
    try {
      await authService.logout();
    } finally {
      setState({
        user: null,
        organization: [],
        isAuthenticated: false,
        isLoading: false,
      });

      router.push("/login");
      router.refresh();
    }
  };

  /**
   * Register organization
   */
  const registerOrganization = async (
    data: RegisterOrgPayload
  ): Promise<RegisterOrgResponse> => {
    const response = await authService.registerBaseOrganization(data);
    await refreshUser();
    return response;
  };

  /**
   * Switch organization
   *
   * Backend updates session context.
   * We then refresh user so UI reflects active org.
   */
  const switchOrganization = async (orgId: string): Promise<void> => {
    await authService.switchContext(orgId);
    await refreshUser();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        refreshUser,
        logout,
        registerOrganization,
        switchOrganization,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};




// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import {  AuthState, LoginCredentials, RegisterData, RegisterOrgPayload, RegisterOrgResponse } from '../types/auth';
// import { authService } from '../services/auth-service';
// import { useRouter } from "next/navigation";

// interface AuthContextType extends AuthState {
//   login: (credentials: LoginCredentials) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
//   registerOrganization: (data: RegisterOrgPayload) => Promise<RegisterOrgResponse>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const [state, setState] = useState<AuthState>({
//     user: null,
//     organization: [], 
//     isAuthenticated: false,
//     isLoading: true,
//   });

//   const refreshUser = async () => {
//     try {
//       const userData = await authService.getMe();
      
//       if (!userData) {
//         // Agar data nahi mila, toh storage clean karein
//         localStorage.removeItem('isLoggedIn');
//         setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
//         return;
//       }

//       setState({ 
//         user: userData, 
//         organization: userData.organizations || [], 
//         isAuthenticated: true, 
//         isLoading: false 
//       });
//     } catch (error) {
//       console.log("Error fetching user profile", error);
//       localStorage.removeItem('isLoggedIn');
//       setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
//     }
//   };

//   useEffect(() => {
//     const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    
//     if (isLoggedInFlag) {
//       refreshUser();
//     } else {
//       setState(prev => ({ ...prev, isLoading: false }));
//     }
//   }, []);

//   // const login = async (credentials: LoginCredentials) => {
//   //   await authService.login(credentials);
    
//   //   // 2. Login success hone par flag set karein
//   //   localStorage.setItem('isLoggedIn', 'true');
    
//   //   const userData: User = await authService.getMe();
//   //   setState({ 
//   //     user: userData, 
//   //     organization: userData.organizations || [], 
//   //     isAuthenticated: true, 
//   //     isLoading: false 
//   //   });
//   // };


//   const login = async (credentials: LoginCredentials) => {
//   await authService.login(credentials);
  
//   localStorage.setItem('isLoggedIn', 'true');
//     const userData = await authService.getMe();
//     if (!userData) {
//     throw new Error("Login successful but failed to fetch user profile.");
//   }
//   setState({ 
//     user: userData, 
//     organization: userData.organizations || [], 
//     isAuthenticated: true, 
//     isLoading: false 
//   });
// };

//   const register = async (data: RegisterData) => {
//     await authService.register(data);
//   };

//   const logout = async () => {
//     try {
//       await authService.logout();
//     } catch (error) {
//       console.error("Logout API failed", error);
//     } finally {
//       // 3. Logout par flag remove karein
//       localStorage.removeItem('isLoggedIn');
      
//       setState({ 
//         user: null, 
//         organization: [], 
//         isAuthenticated: false, 
//         isLoading: false 
//       });
//       router.push("/login");
//       router.refresh();
//     }
//   };

//   const registerOrganization = async (data: RegisterOrgPayload) => {
//     try {
//       const response = await authService.registerBaseOrganization(data);
//       await refreshUser(); 
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, register, refreshUser, logout, registerOrganization }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error("useAuth must be used within an AuthProvider");
//   return context;
// };