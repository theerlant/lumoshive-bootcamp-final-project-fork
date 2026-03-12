import { HeartIcon, SearchIcon, ShoppingCartIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { AccountDropdown } from "./AccountDropdown";

export const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header
      className={`sticky top-0 bg-white px-24 py-4 pt-8 border-b border-b-black/30 ${user && isAuthenticated ? "flex items-center justify-between" : "grid grid-cols-3 align-middle"}`}
    >
      <Logo />
      <nav className="flex gap-12 justify-between items-center *:hover:underline">
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
        <Link to="/auth/register">Sign Up</Link>
      </nav>
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-self-end bg-[#F5F5F5] py-2 pl-5 pr-3 text-xs">
          <input
            className="outline-0 w-50"
            placeholder="What are you looking for?"
          />
          <SearchIcon />
        </div>
        <Link to="/wishlist">
          <HeartIcon />
        </Link>
        <Link to="/cart">
          <ShoppingCartIcon />
        </Link>
        <AccountDropdown />
      </div>
    </header>
  );
};
