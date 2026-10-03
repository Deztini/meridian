import { create } from "zustand";

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

interface AuthStore {
  accessToken: string | null;
  user: AuthUser | null;
  isInitializing: boolean;
  setAuth: (accessToken: string, user: AuthUser) => void;
  clearAuth: () => void;
  setIntializing: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isInitializing: true,
  setAuth: (accessToken, user) => set({ accessToken, user }),
  clearAuth: () => set({ accessToken: null, user: null }),
  setIntializing: (value) => set({ isInitializing: value }),
}));
