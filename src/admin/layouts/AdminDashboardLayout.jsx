import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect } from "react";

// Layout semua dashboard
export default function AdminDashboardLayout() {
  const location = useLocation();

  const isAtHome = location.pathname === "/admin";

  return (
    <div className="flex items-start w-full h-screen overflow-hidden bg-[#F4F5F9]">
      <Navbar />
      <main className="flex-1 w-full h-screen overflow-y-auto">
        <div className="m-8 my-12">
          <div
            className={`w-full rounded-2xl font-admin ${!isAtHome ? "bg-white p-4" : ""}`}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
