import {
  HeartIcon,
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
  XIcon,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { AccountDropdown } from "./AccountDropdown";
import { useState } from "react";
import { Button } from "./Button";
import useSWR from "swr";
import { UserService } from "../../shared/services/userService";

export const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [smDropdownVisible, setSmDropdownvisible] = useState(false);

  return (
    <>
      {/* Desktop Layout */}
      <header
        className={`hidden lg:block sticky top-0 bg-white py-4 pt-8 border-b border-b-black/30 `}
      >
        <div
          className={`px-8 md:px-12 lg:px-16 xl:px-24 2xl:px-48 flex items-center justify-between gap-4`}
        >
          <Logo />
          <nav className="flex gap-4 justify-between items-center *:hover:underline">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">About</Link>
            <Link to="/auth/register">Sign Up</Link>
          </nav>
          <div className="flex items-center justify-end gap-4">
            <div className="flex items-center justify-self-end bg-[#F5F5F5] py-2 pl-5 pr-3 text-xs">
              <input
                className="outline-0 w-50"
                placeholder="What are you looking for?"
              />
              <SearchIcon />
            </div>
            {user && isAuthenticated ? (
              <>
                <Link to="/wishlist">
                  <HeartIcon />
                </Link>
                <Link to="/cart">
                  <ShoppingCartIcon />
                </Link>
                <AccountDropdown />{" "}
              </>
            ) : null}
          </div>
        </div>
      </header>
      {/* Mobile Layout */}
      <header className="sticky lg:hidden top-0 z-10 bg-white">
        <div className="flex justify-between px-8 md:px-12 lg:px-16 xl:px-24 py-8">
          <Logo />
          <button
            type="button"
            className="hover:cursor-pointer"
            onClick={() => setSmDropdownvisible((prev) => !prev)}
          >
            {smDropdownVisible ? (
              <XIcon className="scale-120" />
            ) : (
              <MenuIcon strokeWidth={4} className="scale-x-120" />
            )}
          </button>
        </div>
        <div className="relative w-full">
          <div
            className={`flex flex-col items-stretch bg-white pt-4 z-10 pb-4 rounded-b-[20px] shadow-xl w-full absolute ${smDropdownVisible ? "absolute" : "hidden"}`}
          >
            <div className="flex w-auto bg-[#F5F5F5] mx-8 mb-4 py-2 pl-5 pr-3 text-xs rounded-sm">
              <input
                className="outline-0 w-50 flex-1"
                placeholder="What are you looking for?"
              />
              <SearchIcon />
            </div>
            <MobileNavItem to="/" active label="Home" />
            <MobileNavItem label="Contact" to="/contact" />
            <MobileNavItem label="About" to="/about" />
            <MobileNavItem label="Wishlist" to="/wishlist" />
            {user && isAuthenticated ? <MobileUserInfo user={user} /> : null}
            <div className="mx-8 w-auto bg-[#15294E]/20 h-0.5" />
            {!user && !isAuthenticated ? (
              <div className="flex justify-end items-center gap-2 mt-12 px-8 mb-4">
                <Button variant="outlinedAlt" small>
                  Sign Up
                </Button>
                <Button small>Login</Button>
              </div>
            ) : null}
          </div>
        </div>
      </header>
    </>
  );
};

const MobileNavItem = ({ to, active = false, label = "Nav Item" }) => {
  return (
    <Link to={to} className="flex items-center gap-4">
      <div
        className={`${active ? "bg-[#DB4444]" : "bg-transparent"} w-2.5 h-12`}
      />
      <span className={active ? "font-medium" : "text-black/50"}>{label}</span>
    </Link>
  );
};

const MobileUserInfo = ({ user }) => {
  return (
    <Link to="/me" className="flex gap-4 items-center px-6.5 py-4">
      <img
        src={
          user?.profile?.avatar_url
            ? `http://103.150.116.241:8082${user.profile.avatar_url}`
            : "/avatar_placeholder.png"
        }
        className="w-8 aspect-square rounded-full border-[1.5px] border-[#CED4DA]"
      />
      <span className="text-black/50">{user?.profile?.full_name}</span>
    </Link>
  );
};
