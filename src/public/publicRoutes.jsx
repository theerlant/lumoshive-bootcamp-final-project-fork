import { Route, Routes } from "react-router-dom";

export const PublicRoutes = () => {
  return (
    <div className="font-public">
      <Routes>
        <Route index element={<>HOME PAGE</>} />
        <Route path="auth">
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
        <Route path="about" element={<>ABOUT US</>} />
        <Route path="contact" element={<>CONTACT US</>} />

        <Route path="401" element={<>401</>} />
        <Route path="500" element={<>500</>} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </div>
  );
};
