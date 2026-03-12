import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const PublicLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main
        className={
          location.pathname.includes("auth")
            ? "grow flex"
            : "grow flex px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 py-20"
        }
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
