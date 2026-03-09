import { Route, Routes } from "react-router-dom";
import AdminAuthLayout from "./layouts/AdminAuthLayout";
import AdminAuthMiscLayout from "./layouts/AdminAuthMiscLayout";
import AdminProtectedRoutes from "./adminProtectedRoutes";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminLoginPage from "./pages/auth/AdminLoginPage";
import AdminSignupPage from "./pages/auth/AdminSignupPage";
import AdminDashboardPage from "./pages/protected/AdminDashboardPage";
import { AdminProductsPage } from "./pages/protected/products/AdminProductsPage";
import { AdminDetailProductPage } from "./pages/protected/products/AdminDetailProductPage";
import { AdminAddProductPage } from "./pages/protected/products/AdminAddProductPage";
import { AdminInputOTPPage } from "./pages/auth-misc/AdminInputOtpPage";
import { AdminEditProductPage } from "./pages/protected/products/AdminEditProductPage";
import AdminOrderListPage from "./pages/protected/orders/AdminOrderListPage";

export default function AdminRoutes() {
  return (
    <div className="font-admin">
      <Routes>
        <Route path="auth">
          <Route element={<AdminAuthLayout />}>
            <Route index element={<AdminLoginPage />} />
            <Route path="login" element={<AdminLoginPage />} />
            <Route path="register" element={<AdminSignupPage />} />
          </Route>
          <Route element={<AdminAuthMiscLayout />}>
            <Route path="forgot" element={<>TODO</>} />
            <Route path="otp" element={<AdminInputOTPPage />} />
          </Route>
        </Route>
        <Route element={<AdminProtectedRoutes />}>
          <Route element={<AdminDashboardLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="products">
              <Route index element={<AdminProductsPage />} />
              <Route path=":id" element={<AdminDetailProductPage />} />
              <Route path="add" element={<AdminAddProductPage />} />
              <Route path=":id/edit" element={<AdminEditProductPage />} />
            </Route>
            <Route path="categories" element={<>TODO CATEGORIES</>} />
            <Route path="orders" element={<AdminOrderListPage />} />
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
    </div>
  );
}
