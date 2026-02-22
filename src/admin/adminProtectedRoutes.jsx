import { Navigate, Outlet } from "react-router-dom";

// Logika verifikasi status autentikasi / login sebelum render protected routes.
export default function AdminProtectedRoutes() {
  // TODO LOGIC
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/login" replace />;
  }

  return <Outlet />;
}
