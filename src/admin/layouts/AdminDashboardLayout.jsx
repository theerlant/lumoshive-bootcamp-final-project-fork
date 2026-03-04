import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

// Layout semua dashboard
export default function AdminDashboardLayout() {
  return (
    <div className="flex items-start w-full h-screen overflow-hidden bg-[#F4F5F9]">
      <Navbar />
      <main className="flex-1 w-full h-screen overflow-y-auto">
        <div className="m-8 my-12">
          <div className="bg-white w-full rounded-2xl p-4 font-admin">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
