import { Outlet } from "react-router-dom";

// Layout semua dashboard
export default function AdminDashboardLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
