import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "./authStore";

export function RequireAuth() {
    const { user, isLoading, loadMe } = useAuthStore();

    useEffect(() => { loadMe(); }, [loadMe]);

    if (isLoading) return null; // позже заменим на спиннер
    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
