import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./authStore.js";

export function RequireAuth() {
    const user = useAuthStore((s) => s.user);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}