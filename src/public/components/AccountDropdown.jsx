import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserIcon, ShoppingBagIcon, StarIcon, LogOutIcon } from "lucide-react";

export const AccountDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:outline-none transition-colors hover:cursor-pointer p-1.5 rounded-full ${
          isOpen ? "bg-[#DB4444] text-white" : ""
        }`}
      >
        <UserIcon strokeWidth={2} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-56 rounded-sm bg-black/50 backdrop-blur-3xl text-white z-50">
          <div className="py-2 flex flex-col text-sm font-light">
            <Link
              to="/me"
              className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon size={20} strokeWidth={1.5} />
              <span>Manage My Account</span>
            </Link>
            <Link
              to="/orders"
              className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBagIcon size={20} strokeWidth={1.5} />
              <span>My Order</span>
            </Link>
            <Link
              to="/reviews"
              className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <StarIcon size={20} strokeWidth={1.5} />
              <span>My Reviews</span>
            </Link>
            <button
              type="button"
              className="flex items-center gap-3 px-5 py-2.5 hover:bg-white/10 transition-colors w-full text-left"
              onClick={() => {
                setIsOpen(false);
                // Handle logout logic here
              }}
            >
              <LogOutIcon size={20} strokeWidth={1.5} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
