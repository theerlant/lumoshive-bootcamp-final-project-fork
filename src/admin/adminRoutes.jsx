import { Route, Routes } from "react-router-dom";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AdminAuthMiscLayout from "./layouts/AdminAuthMiscLayout";
import AdminProtectedRoutes from "./adminProtectedRoutes";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminLoginPage from "./pages/auth/AdminLoginPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="auth">
        <Route element={<AdminAuthLayout />}>
          <Route path="login" element={<AdminLoginPage />} />
          <Route path="register" element={<>TODO</>} />
        </Route>
        <Route element={<AdminAuthMiscLayout />}>
          <Route path="forgot" element={<>TODO</>} />
          <Route path="otp" element={<>TODO</>} />
        </Route>
      </Route>
      <Route element={<AdminProtectedRoutes />}>
        <Route element={<AdminDashboardLayout />}>
          <Route
            index
            element={<div className="h-[200vh]">TODO DASHBOARD</div>}
          />
          <Route path="products">
            <Route index element={<>TODO PRODUCT LIST PAGE</>} />
            <Route path=":id" element={<>TODO DETAIL PRODUCT</>} />
            <Route path="add" element={<>TODO ADD PRODUCT</>} />
            <Route path="edit/:id" element={<>TODO EDIT PRODUCT</>} />
          </Route>
          <Route path="categories" element={<>TODO CATEGORIES</>} />
          <Route path="orders" element={<>TODO ORDERS</>} />
          <Route path="promotions">
            <Route index element={<>TODO PROMOTION LIST PAGE</>} />
            <Route path=":id" element={<>TODO DETAIL PROMOTION</>} />
            <Route path="add" element={<>TODO ADD PROMOTION</>} />
            <Route path="edit/:id" element={<>TODO EDIT PROMOTION</>} />
          </Route>
          <Route path="banners">
            <Route index element={<>TODO BANNER LIST PAGE</>} />
            <Route path=":id" element={<>TODO DETAIL BANNER</>} />
            <Route path="add" element={<>TODO ADD BANNER</>} />
            <Route path="edit/:id" element={<>TODO EDIT BANNER</>} />
          </Route>
          <Route path="ratings" element={<>TODO USERS PAGE</>} />
          <Route path="stocks">
            <Route index element={<>TODO STOCK LIST PAGE</>} />
            <Route path=":id" element={<>TODO DETAIL STOCK</>} />
            <Route path="add" element={<>TODO ADD STOCK</>} />
            <Route path="edit/:id" element={<>TODO EDIT STOCK</>} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
