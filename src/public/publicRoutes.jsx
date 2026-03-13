import { Route, Routes } from "react-router-dom";
import ContactUs from "./pages/unprotected/misc/ContactUsPage";
import AboutPage from "./pages/unprotected/misc/AboutPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { PublicAuthLayout } from "./layouts/PublicAuthLayout";
import { PublicLoginPage } from "./pages/auth/PublicLoginPage";
import { PublicRegisterPage } from "./pages/auth/PublicRegisterPage";
import { PublicForgotPasswordPage } from "./pages/auth/PublicForgotPasswordPage";
import { PublicOTPPage } from "./pages/auth/PublicOtpPage";
import { PublicProtectedRoutes } from "./publicProtectedRoutes";
import UnauthorizedPage from "./pages/errors/401";
import ServerErrorPage from "./pages/errors/500";
import NotFoundPage from "./pages/errors/404";
import { MyProfilePage } from "./pages/protected/account/MyProfilePage";
import { AddressBookPage } from "./pages/protected/account/AddressBookPage";
import { CreateAddressBookPage } from "./pages/protected/account/CreateAddressBookPage";
import { UpdateAddressBookPage } from "./pages/protected/account/UpdateAddressBookPage";
import { MyOrdersPage } from "./pages/protected/account/MyOrdersPage";
import { AccountLayout } from "./pages/protected/account/components/AccountLayout";
import { HomePage } from "./pages/unprotected/HomePage";
import { ProductDetailPage } from "./pages/unprotected/products/ProductDetailPage";
import { MyCartPage } from "./pages/protected/checkout/MyCartPage";
import { CheckoutPage } from "./pages/protected/checkout/CheckoutPage";
import { CheckoutSuccessPage } from "./pages/protected/checkout/CheckoutSuccessPage";
import AllProductsPage from "./pages/unprotected/products/AllProductsPage";
import ByCategoryPage from "./pages/unprotected/products/ByCategoryPage";

export const PublicRoutes = () => {
  return (
    <div className="font-public">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route index element={<>HOME PAGE</>} />
          <Route path="all" element={<AllProductsPage />} />
          <Route path="category/:categoryId" element={<ByCategoryPage />} />

          <Route path="auth" element={<PublicAuthLayout />}>
            <Route index element={<PublicLoginPage />} />
            <Route path="login" element={<PublicLoginPage />} />
            <Route path="register" element={<PublicRegisterPage />} />
            <Route path="forgot" element={<PublicForgotPasswordPage />} />
            <Route path="otp" element={<PublicOTPPage />} />
          </Route>
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route element={<PublicProtectedRoutes />}>
            <Route path="me" element={<AccountLayout />}>
              <Route index element={<MyProfilePage />} />
              <Route path="orders" element={<MyOrdersPage />} />
              <Route path="address">
                <Route index element={<AddressBookPage />} />
                <Route path="new" element={<CreateAddressBookPage />} />
                <Route path=":id" element={<UpdateAddressBookPage />} />
              </Route>
            </Route>
            <Route path="wishlist" element={<>MY WISHLIST</>} />
            <Route path="cart">
              <Route index element={<MyCartPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
            </Route>
            <Route path="order-success/:id" element={<CheckoutSuccessPage />} />
          </Route>
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactUs />} />

          <Route path="401" element={<UnauthorizedPage />} />
          <Route path="500" element={<ServerErrorPage />} />
          {/* Wildcard route direct to 404 Not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  );
};
