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

          <Route path="401" element={<>401</>} />
          <Route path="500" element={<>500</>} />
          <Route path="*" element={<>404</>} />
        </Route>
      </Routes>
    </div>
  );
};
