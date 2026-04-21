import { create } from "zustand";
import { http } from "/src/shared/api/http.js";

export const useAuthStore = create((set, get) => ({
    isAuth: false,
    token: null,
    user: null, // { id, name, role }
    isLoading: true, // флаг начальной загрузки

    login: ({ token, user }) =>
        set({ isAuth: true, token, user, isLoading: false }),

    logout: () =>
        set({ isAuth: false, token: null, user: null, isLoading: false }),

    // Вызывается при старте приложения — восстанавливает сессию
    initAuth: async () => {
        try {
            const response = await http.get("/auth/me/");
            set({ isAuth: true, user: response.data, isLoading: false });
        } catch {
            set({ isAuth: false, user: null, isLoading: false });
        }
    },
}));