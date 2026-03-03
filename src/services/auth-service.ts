import axios from 'axios';
import { 
  RegisterData, 
  LoginCredentials, 
  User, 
  RegisterResponse, 
  RegisterOrgPayload, 
  RegisterOrgResponse ,

} from '../types/auth';

// const USER_API = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:3017/api';
// const AUTH_API = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3016/api';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; 

// UPDATED POINT: Pointing to the correct auth-service verified via Postman
const USER_API = "https://api.dev.yaarigo.com/auth-service"; 
const AUTH_API = "https://api.dev.yaarigo.com/auth-service";

// Axios Instance for common config (optional but recommended)
const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*',
  },
  withCredentials: true, // Cookies handle karne ke liye
});

export const authService = {
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const res = await apiClient.post<RegisterResponse>(`${USER_API}/users/register`, data);
      return res.data;
    } catch (error) {
      return this.handleError(error, 'Registration failed');
    }
  },

  async login(credentials: LoginCredentials): Promise<void> {
    try {
      await apiClient.post(`${AUTH_API}/auth/login`,   credentials);
    } catch (error) {
      this.handleError(error, 'Login failed');
    }
  },

  // async getMe(): Promise<User> {
  //   try {
  //     const res = await apiClient.get<User>(`${AUTH_API}/auth/me`);
  //     return res.data;
  //   } catch (error) {
  //     throw new Error('Unauthorized');
  //   }
  // },
  
  async getMe(): Promise<User | null> {
  try {
    const res = await apiClient.get<User>(`${AUTH_API}/auth/me`);
    return res.data;
  } catch (error) {
    // Agar 401 error hai, toh console error mat dikhao aur null bhej do
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return null; 
    }
    throw error;
  }
 },

  async logout(): Promise<void> {
    try {
      await apiClient.post(`${AUTH_API}/auth/logout`);
    } catch (error) {
      console.log("Logout API failed", error);
      throw new Error('Logout failed on server');
    }
  },

  async registerBaseOrganization(data: RegisterOrgPayload): Promise<RegisterOrgResponse> {
    try {
      const res = await apiClient.post<RegisterOrgResponse>(`${USER_API}/organizations/register-base`, data);
      return res.data;
    } catch (error) {
      return this.handleError(error, 'Organization registration failed');
    }
  },

  //switch org context 

 async switchContext(orgId: string) {
  const res = await apiClient.post(
    `${AUTH_API}/auth/switch-context`,
    { orgId }
  );

  return res.data;
},



  // Helper function to keep code DRY
  handleError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      throw new Error(serverMessage || defaultMessage);
    }
    throw new Error(defaultMessage);
  }
};