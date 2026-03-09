import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentSandbox from "./sandbox/Sandbox";
import AdminRoutes from "./admin/adminRoutes";
import { Provider } from "react-redux";
import store from "./shared/features/store";
import NotFoundPage from "./public/pages/errors/404";
import UnauthorizedPage from "./public/pages/errors/401";
import ServerErrorPage from "./public/pages/errors/500";
import WishlistPage from "./public/pages/protected/WishlistPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {process.env.NODE_ENV === "development" && (
            <Route path="/sandbox" element={<WishlistPage/> } />
          )}
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;