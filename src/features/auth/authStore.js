// src/store/authStore.js
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    isAuth: false,
    token: null,
    user: null, // { id, name, role }
    login: ({ token, user }) =>
        set({ isAuth: true, token, user }),
    logout: () =>
        set({ isAuth: false, token: null, user: null }),
}));
