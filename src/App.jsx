import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentSandbox from "./sandbox/Sandbox";
import AdminRoutes from "./admin/adminRoutes";
import { Provider } from "react-redux";
import store from "./shared/features/store";
import { PublicRoutes } from "./public/publicRoutes";
import "react-toastify/dist/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Slide}
        theme="light"
        toastStyle={{
          backgroundColor: "white",
          transition: "ease-in-out",
          color: "black",
          borderRadius: "4px",
          boxShadow:
            "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          fontFamily: "inherit",
          borderLeft: "4px solid #DB4444",
        }}
      />
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
