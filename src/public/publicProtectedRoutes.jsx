import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicProtectedRoutes = () => {
  // TODO LOGIC
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};
