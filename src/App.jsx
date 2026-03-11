import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentSandbox from "./sandbox/Sandbox";
import AdminRoutes from "./admin/adminRoutes";
import { Provider } from "react-redux";
import store from "./shared/features/store";
import ContactUs from "./public/pages/unprotected/misc/ContactUsPage";
import AboutPage from "./public/pages/unprotected/misc/AboutPage";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {process.env.NODE_ENV === "development" && (
            <Route path="/sandbox" element={<ComponentSandbox />} />
          )}
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path ="/contactus" element={<ContactUs/>}/>
          <Route path ="/aboutpage" element={<AboutPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
