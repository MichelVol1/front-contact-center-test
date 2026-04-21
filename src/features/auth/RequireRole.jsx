import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./authStore.js";

export function RequireRole({ roles }) {
    const user = useAuthStore((s) => s.user);

    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}