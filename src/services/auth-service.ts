
import { LoginRequest, LoginResponse, UserProfile } from "react-date-range";
import axiosClient from "../../src/lib/axios-client";
import { RegisterRequest, RegisterResponse } from "../../src/types/react-date-range";

export const authService = {
  // 1. Register API
  register: async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await axiosClient.post('/users/api/users/register', data);
    return response.data;
  },

  login: async (credentials: LoginRequest): Promise<any> => {
    try {
      const response = await axiosClient.post('/auth/api/auth/login', credentials);
      
      if (response.data?.access_token) {
        localStorage.setItem('token', response.data.access_token);
      }
      const fullProfile = await authService.getMe();
      
      return {
        ...response.data,
        user: fullProfile 
      };
    } catch (error: any) {
      throw error.response?.data || { message: "Login failed" };
    }
  },

  getMe: async (): Promise<any> => {
    try {
      const response = await axiosClient.get('/auth/api/auth/me'); 
      return response.data;
    } catch (error: any) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },

  // 3. Logout
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  }
};





