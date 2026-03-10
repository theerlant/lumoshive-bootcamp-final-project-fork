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
import AdminCategoryListPage from "./pages/protected/categories/AdminCategoryListPage";
import AdminRatingListPage from "./pages/protected/rating/AdminRatingPage";
import AdminStockListPage from "./pages/protected/stocks/AdminStockListPage";
import AdminStockDetailPage from "./pages/protected/stocks/AdminStockDetailPage";
import AdminStockFormPage from "./pages/protected/stocks/AdminStockFormPage";
import AdminOrderListPage from "./pages/protected/orders/AdminOrderListPage";
import { AdminPromotionListPage } from "./pages/protected/promotions/AdminPromotionListPage";
import { AdminAddPromotionPage } from "./pages/protected/promotions/AdminAddPromotionPage";
import { AdminDetailPromotionPage } from "./pages/protected/promotions/AdminDetailPromotionPage";
import { AdminEditPromotionPage } from "./pages/protected/promotions/AdminEditPromotionPage";



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
            <Route path="categories" element={<AdminCategoryListPage />} />
            <Route path="orders" element={<AdminOrderListPage />} />
            <Route path="promotions">
              <Route index element={<AdminPromotionListPage />} />
              <Route path=":id" element={<AdminDetailPromotionPage />} />
              <Route path="add" element={<AdminAddPromotionPage />} />
              <Route path="edit/:id" element={<AdminEditPromotionPage />} />
            </Route>
            <Route path="banners">
              <Route index element={<>TODO BANNER LIST PAGE</>} />
              <Route path=":id" element={<>TODO DETAIL BANNER</>} />
              <Route path="add" element={<>TODO ADD BANNER</>} />
              <Route path="edit/:id" element={<>TODO EDIT BANNER</>} />
            </Route>
            <Route path="ratings" element={<AdminRatingListPage />} />
            <Route path="stocks">
              <Route index element={<AdminStockListPage />} />
              <Route path="add" element={<AdminStockFormPage mode="add" />} />
              <Route path="edit/:id" element={<AdminStockFormPage mode="edit" />} />
              <Route path="detail/:id" element={<AdminStockDetailPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
