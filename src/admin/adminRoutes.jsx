import { Route, Routes } from "react-router-dom";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AdminAuthMiscLayout from "./layouts/AdminAuthMiscLayout";
import AdminProtectedRoutes from "./adminProtectedRoutes";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="auth">
        <Route element={<AdminAuthLayout />}>
          <Route path="login" element={<>TODO</>} />
          <Route path="register" element={<>TODO</>} />
        </Route>
        <Route element={<AdminAuthMiscLayout />}>
          <Route path="forgot" element={<>TODO</>} />
          <Route path="otp" element={<>TODO</>} />
        </Route>
      </Route>
      <Route element={<AdminProtectedRoutes />}>
        <Route element={<AdminDashboardLayout />}>
          <Route index element={<>TODO DASHBOARD</>} />
          <Route path="users" element={<>TODO USERS PAGE</>} />
          {/* Add more routes here later */}
        </Route>
      </Route>
    </Routes>
  );
}
