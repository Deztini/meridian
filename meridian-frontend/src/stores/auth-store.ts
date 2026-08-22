import { create } from "zustand";

interface AuthUser {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  currentUser: AuthUser | null;
  setCurrentUser: (user: AuthUser | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));
