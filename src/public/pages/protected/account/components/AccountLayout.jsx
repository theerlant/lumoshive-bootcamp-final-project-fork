import { useSelector } from "react-redux";
import { AccountSidebar } from "./AccountSidebar";
import { Outlet } from "react-router-dom";
import { Breadcrumbs } from "../../../../components/BreadCrumbs";

export const AccountLayout = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full">
      {/* Breadcrumbs & Welcome - Hidden/Adjusted for Mobile */}
      <div className="flex justify-between items-center mb-6 lg:mb-10 text-xs lg:text-sm">
        <Breadcrumbs
          items={[{ label: "Home", href: "/" }, { label: "My Account" }]}
        />
        <div className="hidden lg:block">
          Welcome!{" "}
          <span className="text-[#DB4444] font-medium">
            {user.profile.full_name}
          </span>
        </div>
      </div>

      {/* Main Layout: Stacked on Mobile, Side-by-side on Desktop */}
      <div className="w-full flex flex-col lg:flex-row lg:gap-10">
        <AccountSidebar />
        <div className="flex-1 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
