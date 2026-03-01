import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// Logika verifikasi status autentikasi / login sebelum render protected routes.
export default function AdminProtectedRoutes() {
  // TODO LOGIC
  // const { isAuthenticated } = useSelector((state) => state.auth);
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/admin/auth/login" replace />;
  }

  return <Outlet />;
}
