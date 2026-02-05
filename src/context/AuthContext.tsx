
// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';
// import { authService } from '../services/auth-service';

// interface AuthContextType extends AuthState {
//   login: (credentials: LoginCredentials) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   const [state, setState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//     isLoading: true,
//   });


//   const refreshUser = async () => {
//     try {
//       const userData = await authService.getMe();
//       setState({ user: userData, isAuthenticated: true, isLoading: false });
//     } catch {
//       setState({ user: null, isAuthenticated: false, isLoading: false });
//     }
//   };

  
//   useEffect(() => {
//     refreshUser();
//   }, []);

  
//   const login = async (credentials: LoginCredentials) => {
//     // Note: authService.login sets the HttpOnly cookie automatically
//     await authService.login(credentials);
//     // Fetch the actual user data using that cookie
//     const userData = await authService.getMe();
//     setState({ user: userData, isAuthenticated: true, isLoading: false });
//   };


//   const register = async (data: RegisterData) => {
//     await authService.register(data);
   
//   };

//   const logout = () => {
   
//     setState({ user: null, isAuthenticated: false, isLoading: false });
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, register, refreshUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


// "use client";

// import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// import { User, AuthState, LoginCredentials, RegisterData } from '../types/auth';
// import { authService } from '../services/auth-service';

// interface AuthContextType extends AuthState {
//   login: (credentials: LoginCredentials) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   refreshUser: () => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
//   // State is already strictly typed with AuthState (which includes User | null)
//   const [state, setState] = useState<AuthState>({
//     user: null,
//     isAuthenticated: false,
//     isLoading: true,
//   });

//   const refreshUser = async () => {
//     try {
//       // getMe() now returns 'User' type (as defined in auth-service)
//       const userData: User = await authService.getMe();
//       setState({ user: userData, isAuthenticated: true, isLoading: false });
//     } catch {
//       setState({ user: null, isAuthenticated: false, isLoading: false });
//     }
//   };

//   useEffect(() => {
//     refreshUser();
//   }, []);

//   const login = async (credentials: LoginCredentials) => {
//     await authService.login(credentials);
    
//     // Yahan hum explicitly bata rahe hain ki data 'User' format mein hai
//     const userData: User = await authService.getMe();
    
//     setState({ 
//       user: userData, 
//       isAuthenticated: true, 
//       isLoading: false 
//     });
//   };

//   const register = async (data: RegisterData) => {
//     // Register sirf call hota hai, response context mein save nahi hota 
//     // kyunki login flow alag hai
//     await authService.register(data);
//   };

//   const logout = () => {
//     // State reset
//     setState({ user: null, isAuthenticated: false, isLoading: false });
//   };

//   return (
//     <AuthContext.Provider value={{ ...state, login, register, refreshUser, logout }}>
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
import { User, AuthState, LoginCredentials, RegisterData, Organization } from '../types/auth';
import { authService } from '../services/auth-service';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refreshUser: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    organization: [], // Error 1 fix: Initial state add ki
    isAuthenticated: false,
    isLoading: true,
  });

  // const refreshUser = async () => {
  //   try {
  //     // Maan lijiye aapka getMe user aur orgs dono bhejta hai
  //     const userData: User = await authService.getMe();
      
  //     setState({ 
  //       user: userData, 
  //       organization: userData.organizations || [], // Error 2 fix: Mapping
  //       isAuthenticated: true, 
  //       isLoading: false 
  //     });
  //   } catch {
  //     setState({ user: null, organization: [], isAuthenticated: false, isLoading: false });
  //   }
  // };

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

  const logout = () => {
    setState({ 
      user: null, 
      organization: [], // Error 4 fix
      isAuthenticated: false, 
      isLoading: false 
    });
  };

  return (
    // Error 5 fix: Ab organization value provider mein pass ho rahi hai
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