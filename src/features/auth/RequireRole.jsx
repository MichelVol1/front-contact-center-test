import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "./authStore";

export function RequireRole({ role }) {
  const user = useAuthStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return user.role === role ? <Outlet /> : <Navigate to="/" replace />;
}
