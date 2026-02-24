import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// Layout semua dashboard
export default function AdminDashboardLayout() {
  return (
    <div className="flex w-full h-screen overflow-hidden bg-[#F4F5F9]">
      <Navbar />
      <main className="flex-1 overflow-y-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
