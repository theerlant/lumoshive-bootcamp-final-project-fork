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

export const PublicRoutes = () => {
  return (
    <div className="font-public">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<>HOME PAGE</>} />
          <Route path="auth" element={<PublicAuthLayout />}>
            <Route index element={<PublicLoginPage />} />
            <Route path="login" element={<PublicLoginPage />} />
            <Route path="register" element={<PublicRegisterPage />} />
            <Route path="forgot" element={<PublicForgotPasswordPage />} />
            <Route path="otp" element={<PublicOTPPage />} />
          </Route>
          <Route path="all" element={<>ALL PRODUCTS, CATEGORY BY PARAM</>} />
          <Route path="top" element={<>BEST PRODUCT API ERROR BRO</>} />
          <Route element={<PublicProtectedRoutes />}>
            <Route path="me">
              <Route index element={<>ACCOUNT SETTING</>} />
              <Route path="orders" element={<>MY ORDERS</>} />
              <Route path="address">
                <Route index element={<>ADDRESS LIST</>} />
                <Route path="new" element={<>NEW ADDRESS</>} />
                <Route path=":id/edit" element={<>EDIT ADDRESS </>} />
              </Route>
            </Route>
            <Route path="wishlist" element={<>MY WISHLIST</>} />
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
