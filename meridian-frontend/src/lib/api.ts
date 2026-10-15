import { useAuthStore } from "@/stores/auth-store";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

type RetryableConfig = InternalAxiosRequestConfig & { _retry?: boolean };

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
    const original = error.config as RetryableConfig;
    const status = error.response?.status;

    if (
      status === 401 &&
      !original._retry &&
      !original.url?.includes("/auth/login") &&
      !original.url?.includes("/auth/refresh")
    ) {
      original._retry = true;
      try {
        const res = await apiClient.post("/auth/refresh");
        useAuthStore
          .getState()
          .setAuth(res.data.data.accessToken, res.data.data.user);
        original.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return apiClient(original);
      } catch {
        useAuthStore.getState().clearAuth();
      }
    }

    return Promise.reject(error);
  },
);
