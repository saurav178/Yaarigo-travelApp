

import { RegisterData, LoginCredentials, User ,RegisterResponse} from '../types/auth';

const USER_API = process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:3017/api';
const AUTH_API = process.env.NEXT_PUBLIC_AUTH_SERVICE_URL || 'http://localhost:3016/api';

export const authService = {
  async register(data: RegisterData): Promise<RegisterResponse> {
    const res = await fetch(`${USER_API}/users/register`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'accept': '*/*' 
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Registration failed');
    }
    return res.json();
  },

async login(credentials: LoginCredentials): Promise<void> {
    const res = await fetch(`${AUTH_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'accept': '*/*' },
      body: JSON.stringify(credentials), 
      credentials: 'include', 
    });
    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new Error(error.message || 'Login failed');
    }
  },

  async getMe(): Promise<User> {
    const res = await fetch(`${AUTH_API}/auth/me`, {
      method: 'GET',
      headers: { 'accept': '*/*' },
      credentials: 'include',
    });
    
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  },
  
  async logout(): Promise<void> {
    const res = await fetch(`${AUTH_API}/auth/logout`, {
      method: 'POST',
      headers: { 'accept': '*/*' },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Logout failed on server');
    }
  },
};