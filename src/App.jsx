import { BrowserRouter, Route, Routes } from "react-router-dom";
import ComponentSandbox from "./sandbox/Sandbox";
import AdminRoutes from "./admin/adminRoutes";

function App() {
  // Sandboxing routes
  return (
    <BrowserRouter>
      <Routes>
        {process.env.NODE_ENV === "development" && (
          <Route path="/sandbox" element={<ComponentSandbox />} />
        )}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
