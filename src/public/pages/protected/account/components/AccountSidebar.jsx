import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export const AccountSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper untuk mengecek active state
  const isActive = (path) => currentPath === path;

  return (
    // Mobile: Horizontal Scroll/Flex Row | Desktop: Vertical Column
    <div className="w-full lg:w-64 shrink-0 mb-8 mt-2 lg:mb-0">
      <div className="flex lg:flex-col flex-row gap-4 lg:gap-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
        {/* Section Manage Account */}
        <div className="flex lg:flex-col flex-row gap-2 lg:gap-0 items-center lg:items-start lg:mb-6">
          <h3 className="hidden lg:block font-medium text-gray-900 mb-4">
            Manage My Account
          </h3>
          <ul className="flex lg:flex-col flex-row gap-2 lg:gap-2 lg:ml-6">
            <li>
              <Link
                to="/me"
                className={`whitespace-nowrap px-4 py-2 lg:px-0 lg:py-0 rounded lg:rounded-none text-sm border lg:border-none ${
                  isActive("/me")
                    ? "bg-[#DB4444] text-white lg:bg-transparent lg:text-[#DB4444] lg:font-medium"
                    : "text-gray-500 border-gray-200 lg:hover:text-black"
                }`}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link
                to="/me/address"
                className={`whitespace-nowrap px-4 py-2 lg:px-0 lg:py-0 rounded lg:rounded-none text-sm border lg:border-none ${
                  isActive("/me/address")
                    ? "bg-[#DB4444] text-white lg:bg-transparent lg:text-[#DB4444] lg:font-medium"
                    : "text-gray-500 border-gray-200 lg:hover:text-black"
                }`}
              >
                Address Book
              </Link>
            </li>
          </ul>
        </div>

        {/* Section My Orders */}
        <div className="flex lg:flex-col flex-row gap-2 lg:gap-0 items-center lg:items-start">
          <h3 className="hidden lg:block font-medium text-gray-900 mb-4">
            My Orders
          </h3>
          <ul className="flex lg:flex-col flex-row gap-2 lg:gap-2 lg:ml-6">
            <li>
              <Link
                to="/me/orders"
                className={`whitespace-nowrap px-4 py-2 lg:px-0 lg:py-0 rounded lg:rounded-none text-sm border lg:border-none ${
                  isActive("/me/orders")
                    ? "bg-[#DB4444] text-white lg:bg-transparent lg:text-[#DB4444] lg:font-medium"
                    : "text-gray-500 border-gray-200 lg:hover:text-black"
                }`}
              >
                My Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
