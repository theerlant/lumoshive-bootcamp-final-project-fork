import { useSelector } from "react-redux";
import { AccountSidebar } from "./AccountSidebar";
import { Outlet } from "react-router-dom";

export const AccountLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="max-w-7xl mx-auto px-8 xl:px-12 py-6 lg:py-10">
      {/* Breadcrumbs & Welcome - Hidden/Adjusted for Mobile */}
      <div className="flex justify-between items-center mb-6 lg:mb-10 text-xs lg:text-sm">
        <div className="text-gray-500">
          Home / <span className="text-black font-medium">My Account</span>
        </div>
        <div>
          Welcome!{" "}
          <span className="text-[#DB4444] font-medium">
            {user.profile.full_name}
          </span>
        </div>
      </div>

      {/* Main Layout: Stacked on Mobile, Side-by-side on Desktop */}
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <AccountSidebar />
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
