// src/app/App.jsx
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useAuthStore } from "../features/auth/authStore";

export function App() {
    const initAuth = useAuthStore((s) => s.initAuth);
    const isLoading = useAuthStore((s) => s.isLoading);

    useEffect(() => {
        initAuth();
    }, []);

    if (isLoading) {
        return <div style={{ padding: 24 }}>Загрузка...</div>;
    }

    return <RouterProvider router={router} />;
}