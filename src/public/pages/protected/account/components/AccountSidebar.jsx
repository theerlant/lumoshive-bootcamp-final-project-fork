import { Link, useLocation } from "react-router-dom";

export const AccountSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Helper untuk mengecek active state
  const isActive = (path) => currentPath.includes(path);

  return (
    // Mobile: Horizontal Scroll/Flex Row | Desktop: Vertical Column
    <div className="w-full lg:w-64 flex-shrink-0 mb-8 lg:mb-0">
      <div className="flex lg:flex-col flex-row gap-4 lg:gap-0 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
        
        {/* Section Manage Account */}
        <div className="flex lg:flex-col flex-row gap-2 lg:gap-0 items-center lg:items-start lg:mb-6">
          <h3 className="hidden lg:block font-medium text-gray-900 mb-4">Manage My Account</h3>
          <ul className="flex lg:flex-col flex-row gap-2 lg:gap-2 lg:ml-6">
            <li>
              <Link 
                to="/account/profile" 
                className={`whitespace-nowrap px-4 py-2 lg:px-0 lg:py-0 rounded lg:rounded-none text-sm border lg:border-none ${
                  isActive('profile') 
                  ? 'bg-[#DB4444] text-white lg:bg-transparent lg:text-[#DB4444] lg:font-medium' 
                  : 'text-gray-500 border-gray-200 lg:hover:text-black'
                }`}
              >
                My Profile
              </Link>
            </li>
            <li>
              <Link 
                to="/account/address" 
                className={`whitespace-nowrap px-4 py-2 lg:px-0 lg:py-0 rounded lg:rounded-none text-sm border lg:border-none ${
                  isActive('address') 
                  ? 'bg-[#DB4444] text-white lg:bg-transparent lg:text-[#DB4444] lg:font-medium' 
                  : 'text-gray-500 border-gray-200 lg:hover:text-black'
                }`}
              >
                Address Book
              </Link>
            </li>
          </ul>
        </div>

        {/* Section My Orders */}
        <div className="flex lg:flex-col flex-row gap-2 lg:gap-0 items-center lg:items-start">
          <h3 className="hidden lg:block font-medium text-gray-900 mb-4">My Orders</h3>
          <ul className="flex lg:flex-col flex-row gap-2 lg:gap-2 lg:ml-6">
            <li>
              <Link 
                to="/account/orders" 
                className={`whitespace-nowrap px-4 py-2 lg:px-0 lg:py-0 rounded lg:rounded-none text-sm border lg:border-none ${
                  isActive('orders') 
                  ? 'bg-[#DB4444] text-white lg:bg-transparent lg:text-[#DB4444] lg:font-medium' 
                  : 'text-gray-500 border-gray-200 lg:hover:text-black'
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

export const AccountLayout = ({ children, userName = "Deni" }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 lg:py-10">
      {/* Breadcrumbs & Welcome - Hidden/Adjusted for Mobile */}
      <div className="flex justify-between items-center mb-6 lg:mb-10 text-xs lg:text-sm">
        <div className="text-gray-500">
          Home / <span className="text-black font-medium">My Account</span>
        </div>
        <div>
          Welcome! <span className="text-[#DB4444] font-medium">{userName}</span>
        </div>
      </div>

      {/* Main Layout: Stacked on Mobile, Side-by-side on Desktop */}
      <div className="flex flex-col lg:flex-row lg:gap-10">
        <AccountSidebar />
        <div className="flex-1 w-full">
          {children}
        </div>
      </div>
    </div>
  );
};