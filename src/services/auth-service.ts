
// import { LoginRequest, LoginResponse, UserProfile } from "react-date-range";
// import axiosClient from "../../src/lib/axios-client";
// import { RegisterRequest, RegisterResponse } from "../../src/types/react-date-range";

// export const authService = {
//   register: async (data: RegisterRequest): Promise<RegisterResponse> => {
//     const response = await axiosClient.post('/api/users/register', data);
//     return response.data;
//   },

//   login: async (credentials: LoginRequest): Promise<any> => {
//     try {
//       const response = await axiosClient.post('/api/auth/login', credentials);
      
//       if (response.data?.access_token) {
//         localStorage.setItem('token', response.data.access_token);
//       }
//       const fullProfile = await authService.getMe();
      
//       return {
//         ...response.data,
//         user: fullProfile 
//       };
//     } catch (error: any) {
//       throw error.response?.data || { message: "Login failed" };
//     }
//   },

//   getMe: async (): Promise<any> => {
//     try {
//       const response = await axiosClient.get('/api/auth/me'); 
//       return response.data;
//     } catch (error: any) {
//       console.error("Error fetching user details:", error);
//       throw error;
//     }
//   },

//  logout: async (): Promise<void> => {
//   await axiosClient.post("/api/auth/logout");
//   localStorage.removeItem("token"); 
// }
// };





import axiosClient from "@/lib/axios-client";

/* =======================
   Types (REAL ONES)
======================= */

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  full_name: string;
  password: string;
  phone_number: string;
  role: "INDIVIDUAL" | "BUSINESS";
  organization_name?: string;
}

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

export interface LoginResponse {
  access_token: string;
}

export interface MeResponse {
  user: User;
}

/* =======================
   Service
======================= */

export const authService = {
  register: async (data: RegisterRequest): Promise<void> => {
    await axiosClient.post("/api/users/register", data);
  },

  login: async (
    credentials: LoginRequest
  ): Promise<{ token: string; user: User }> => {
    try {
      const response = await axiosClient.post<LoginResponse>(
        "/api/auth/login",
        credentials
      );

      const token = response.data.access_token;
      localStorage.setItem("token", token);

      const me = await authService.getMe();

      return {
        token,
        user: me.user,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Login failed");
    }
  },

  getMe: async (): Promise<MeResponse> => {
    const response = await axiosClient.get<MeResponse>("/api/auth/me");
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosClient.post("/api/auth/logout");
    localStorage.removeItem("token");
  },
};

