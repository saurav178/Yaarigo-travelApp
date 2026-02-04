
// "use client";
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { authService } from "@/services/auth-service";

// interface AuthContextType {
//   user: any;
//   loading: boolean;
//   isAuthenticated: boolean;
//   organization: any[];
//   login: (credentials: any) => Promise<void>;
//   logout: () => Promise<void>;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<any>(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const checkSession = async () => {
//     try {
     
//       const data = await authService.getMe();
      
//       if (data) {
//         setUser(data.user || data);
//         setIsAuthenticated(true);
//       }
//     } catch (err) {
//       setIsAuthenticated(false);
//       setUser(null);
//     } finally {
//       setLoading(false); 
//     }
//   };

//   useEffect(() => {
//     checkSession();
//   }, []);

//   const login = async (credentials: any) => {
//     setLoading(true);
//     try {
//       await authService.login(credentials);
//       await checkSession(); 
//     } catch (error) {
//       setLoading(false);
//       throw error;
//     }
//   };

//   const logout = async () => {
//     try {
//       await authService.logout(); 
//     } finally {
//       setUser(null);
//       setIsAuthenticated(false);
//       setLoading(false);
//     }
//   };

//   return (
// <AuthContext.Provider value={{ 
//     user, 
//     loading, 
//     isAuthenticated, 
//     organization: user?.organizations || [], 
//     login, 
//     logout 
//   }}>
//           {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const ctx = useContext(AuthContext);
//   console.log("AuthContext:", ctx);
//   if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
//   return ctx;
// };



"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/services/auth-service";

/* =======================
   Types
======================= */

export interface Organization {
  id: string;
  name: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  organizations?: Organization[];
}

export interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;

  loading: boolean;
  isAuthenticated: boolean;

  organizations: Organization[];

  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

/* =======================
   Context
======================= */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   Provider
======================= */

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const checkSession = async () => {
    try {
      const data = await authService.getMe();

      if (data) {
        setUser(data.user ?? data);
        setToken(localStorage.getItem("token"));
      }
    } catch {
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    checkSession();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);

      if (res?.token) {
        localStorage.setItem("token", res.token);
        setToken(res.token);
      }

      await checkSession();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem("token");
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: Boolean(token),
        organizations: user?.organizations ?? [],
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =======================
   Hook
======================= */

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
