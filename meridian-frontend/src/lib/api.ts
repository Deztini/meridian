import { useAuthStore } from "@/stores/auth-store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 401 && !error.config._retry && !error.config.url?.includes("/auth/login") &&
  !error.config.url?.includes("/auth/refresh")) {
      error.config._retry = true;
      try {
       const res = await apiClient.post("/auth/refresh");
       useAuthStore.getState().setAuth(res.data.data.accessToken, res.data.data.user);
       error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
       return apiClient(error.config);
      } catch {
        useAuthStore.getState().clearAuth();
      }
    }

   
    return Promise.reject(error);
  },
);
