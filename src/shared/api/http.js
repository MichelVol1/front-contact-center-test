import axios from "axios";

function getCookie(name) {
    const m = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return m ? decodeURIComponent(m[2]) : null;
}

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // важно для Django session cookie
});

http.interceptors.request.use((config) => {
    const method = (config.method || "get").toLowerCase();
    const csrf = getCookie("csrftoken");

    if (csrf && !["get", "head", "options", "trace"].includes(method)) {
        config.headers["X-CSRFToken"] = csrf;
    }
    return config;
});


