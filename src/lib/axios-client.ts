

 import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, // ZAROORI: Taaki cookies automatically send hon
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*', 
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
 export default axiosClient;