// src/router/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function ProtectedRoute({ children, roles }) {
    const { isAuth, user } = useAuthStore();

    if (!isAuth) {
        return <Navigate to="/login" replace />;
    }

    if (roles && user && !roles.includes(user.role)) {
        // нет прав на этот раздел
        return <Navigate to="/login" replace />;
    }

    return children;
}
