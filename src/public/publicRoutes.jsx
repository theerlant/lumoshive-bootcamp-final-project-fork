import { Route, Routes } from "react-router-dom";
import ContactUs from "./pages/unprotected/misc/ContactUsPage";
import AboutPage from "./pages/unprotected/misc/AboutPage";
import { PublicLayout } from "./layouts/PublicLayout";
import { PublicAuthLayout } from "./layouts/PublicAuthLayout";
import AllProductsPage from "./pages/unprotected/products/AllProductsPage";
import ByCategoryPage from "./pages/unprotected/products/ByCategoryPage";

export const PublicRoutes = () => {
  return (
    <div className="font-public">
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<>HOME PAGE</>} />
          <Route path="products" element={<AllProductsPage />} />
          <Route path="category/:categoryId" element={<ByCategoryPage />} />

          <Route path="auth" element={<PublicAuthLayout />}>
            <Route index element={<>LOGIN</>} />
            <Route path="register" element={<>REGISTER</>} />
            <Route path="forgot" element={<>FORGOT PASSWORD</>} />
            <Route path="otp" element={<>OTP</>} />
          </Route>
          
          <Route path="all" element={<>ALL PRODUCTS, CATEGORY BY PARAM</>} />
          <Route path="top" element={<>BEST PRODUCT API ERROR BRO</>} />
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
