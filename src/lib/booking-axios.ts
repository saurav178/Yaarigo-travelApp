
import axios from 'axios';

const bookingAxios = axios.create({
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*', 
  },
});

bookingAxios.interceptors.request.use((config) => {
  const token = typeof window !== "undefined" ? localStorage.getItem('token') : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default bookingAxios;
