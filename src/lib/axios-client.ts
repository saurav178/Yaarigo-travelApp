

 import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true, 
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

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccessToken = res.data.accessToken;

        if (newAccessToken) {
          localStorage.setItem("token", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }

        return axiosClient(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
 export default axiosClient;



// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "*/*",
//   },
// });

// // REQUEST INTERCEPTOR
// axiosClient.interceptors.request.use((config) => {
//   if (typeof window !== "undefined") {
//     const token = localStorage.getItem("token");

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//   }

//   return config;
// });

// // RESPONSE INTERCEPTOR
// axiosClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // prevent refresh loop
//     const isAuthEndpoint =
//       originalRequest?.url?.includes("/auth/login") ||
//       originalRequest?.url?.includes("/auth/refresh");

//     if (
//       error.response?.status === 401 &&
//       !originalRequest._retry &&
//       !isAuthEndpoint
//     ) {
//       originalRequest._retry = true;

//       try {
//         const refreshResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_AUTH_SERVICE_URL}/auth/refresh`,
//           {},
//           { withCredentials: true }
//         );

//         const newToken = refreshResponse.data?.accessToken;

//         if (!newToken) {
//           throw new Error("No access token returned");
//         }

//         localStorage.setItem("token", newToken);

//         originalRequest.headers.Authorization = `Bearer ${newToken}`;

//         return axiosClient(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("token");

//         if (typeof window !== "undefined" && window.location.pathname !== "/login") {
//           window.location.href = "/login";
//         }

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosClient;