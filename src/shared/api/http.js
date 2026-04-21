import axios from "axios";
import { useAuthStore } from "../../features/auth/authStore";

function getCookie(name) {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[2]) : null;
}

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

// CSRF для Django
http.interceptors.request.use((config) => {
    const method = (config.method || "get").toLowerCase();
    const csrf = getCookie("csrftoken");

    if (csrf && !["get", "head", "options", "trace"].includes(method)) {
        config.headers["X-CSRFToken"] = csrf;
    }
    return config;
});

// Автоматический logout при 401
http.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Сессия истекла — разлогиниваем
            useAuthStore.getState().logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);