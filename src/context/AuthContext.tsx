

// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User, AuthState, LoginCredentials, RegisterData, Organization, RegisterOrgPayload, RegisterOrgResponse } from '../types/auth';
// import { authService } from '../services/auth-service';
// import { useRouter } from "next/navigation";

// interface AuthContextType extends AuthState {
//   login: (credentials: LoginCredentials) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
// registerOrganization: (data: RegisterOrgPayload) => Promise<RegisterOrgResponse>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const router = useRouter();
//   const [state, setState] = useState<AuthState>({
//     user: null,
//     organization: [], // Error 1 fix: Initial state add ki
//     isAuthenticated: false,
//     isLoading: true,
//   });

//   const refreshUser = async () => {
//   try {
//     const userData: User = await authService.getMe();
    
//     // Yahan hum Organization type ka fayda utha sakte hain
//     const orgs: Organization[] = userData.organizations || []; 

//     setState({ 
//       user: userData, 
//       organization: orgs, 
//       isAuthenticated: true, 
//       isLoading: false 
//     });
//   } catch {
//     setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
//   }
// };
//   useEffect(() => {
//     refreshUser();
//   }, []);

//   const login = async (credentials: LoginCredentials) => {
//     await authService.login(credentials);
//     const userData: User = await authService.getMe();
    
//     setState({ 
//       user: userData, 
//       organization: userData.organizations || [], // Error 3 fix
//       isAuthenticated: true, 
//       isLoading: false 
//     });
//   };

//   const register = async (data: RegisterData) => {
//     await authService.register(data);
//   };

//   const logout = async () => {
//   try {
//     await authService.logout(); // Server side logout
//   } catch (error) {
//     console.error("Logout API failed", error);
//   } finally {
//     // Local state hamesha clear karein chahe API fail ho ya pass
//     setState({ 
//       user: null, 
//       organization: [], 
//       isAuthenticated: false, 
//       isLoading: false 
//     });
//     // window.location.href = "/login"; 
//     router.push("/login");
//   router.refresh();
//   }
// };
// const registerOrganization = async (data: RegisterOrgPayload) => {
//   try {
//     const response = await authService.registerBaseOrganization(data);
//       await refreshUser(); 
    
//     return response;
//   } catch (error) {
//     throw error;
//   }
// };
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


"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, LoginCredentials, RegisterData, Organization, RegisterOrgPayload, RegisterOrgResponse } from '../types/auth';
import { authService } from '../services/auth-service';
import { useRouter } from "next/navigation";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
  registerOrganization: (data: RegisterOrgPayload) => Promise<RegisterOrgResponse>;
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

  const refreshUser = async () => {
    try {
      const userData = await authService.getMe();
      
      if (!userData) {
        // Agar data nahi mila, toh storage clean karein
        localStorage.removeItem('isLoggedIn');
        setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
        return;
      }

      setState({ 
        user: userData, 
        organization: userData.organizations || [], 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      localStorage.removeItem('isLoggedIn');
      setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
    }
  };

  useEffect(() => {
    // 1. Sirf tab hit karein jab localStorage mein flag ho
    const isLoggedInFlag = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedInFlag) {
      refreshUser();
    } else {
      // Agar flag nahi hai, toh seedha loading false kar dein bina API hit kiye
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  // const login = async (credentials: LoginCredentials) => {
  //   await authService.login(credentials);
    
  //   // 2. Login success hone par flag set karein
  //   localStorage.setItem('isLoggedIn', 'true');
    
  //   const userData: User = await authService.getMe();
  //   setState({ 
  //     user: userData, 
  //     organization: userData.organizations || [], 
  //     isAuthenticated: true, 
  //     isLoading: false 
  //   });
  // };


  const login = async (credentials: LoginCredentials) => {
  await authService.login(credentials);
  
  localStorage.setItem('isLoggedIn', 'true');
    const userData = await authService.getMe();
    if (!userData) {
    throw new Error("Login successful but failed to fetch user profile.");
  }
  setState({ 
    user: userData, 
    organization: userData.organizations || [], 
    isAuthenticated: true, 
    isLoading: false 
  });
};

  const register = async (data: RegisterData) => {
    await authService.register(data);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout API failed", error);
    } finally {
      // 3. Logout par flag remove karein
      localStorage.removeItem('isLoggedIn');
      
      setState({ 
        user: null, 
        organization: [], 
        isAuthenticated: false, 
        isLoading: false 
      });
      router.push("/login");
      router.refresh();
    }
  };

  const registerOrganization = async (data: RegisterOrgPayload) => {
    try {
      const response = await authService.registerBaseOrganization(data);
      await refreshUser(); 
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, refreshUser, logout, registerOrganization }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};