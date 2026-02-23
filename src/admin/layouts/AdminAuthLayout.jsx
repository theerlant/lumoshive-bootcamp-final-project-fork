import { Outlet } from "react-router-dom";

// Layout selalu memiliki outlet tempat pages tinggal
export default function AdminAuthLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
