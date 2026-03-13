import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentSandbox from "./sandbox/Sandbox";
import AdminRoutes from "./admin/adminRoutes";
import { Provider } from "react-redux";
import store from "./shared/features/store";
import { PublicRoutes } from "./public/publicRoutes";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {process.env.NODE_ENV === "development" && (
            <Route path="/sandbox" element={<ComponentSandbox />} />
          )}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
