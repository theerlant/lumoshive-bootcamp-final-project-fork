import { Route, Routes } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import { HomePage } from "./pages/unprotected/HomePage";
import { MyProfilePage } from "./pages/protected/account/MyProfilePage";
import { MyOrdersPage } from "./pages/protected/account/MyOrdersPage";
import { AddressBookPage } from "./pages/protected/account/AddressBookPage";
import { CreateAddressBookPage } from "./pages/protected/account/CreateAddressBookPage";
import { UpdateAddressBookPage } from "./pages/protected/account/UpdateAddressBookPage";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="account">
          <Route index element={<MyProfilePage />} />
          <Route path="profile" element={<MyProfilePage />} />
          <Route path="orders" element={<MyOrdersPage />} />
          <Route path="address">
            <Route index element={<AddressBookPage />} />
            <Route path="create" element={<CreateAddressBookPage />} />
            <Route path="update/:id" element={<UpdateAddressBookPage />} />
          </Route>
        </Route>
        {/* TODO: Add other public routes (products, checkout, wishlist, etc) */}
      </Route>
    </Routes>
  );
}
