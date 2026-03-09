import { Link } from "react-router-dom";
import {
  LucideSearch,
  LucideHeart,
  LucideShoppingCart,
  LucideUser,
} from "lucide-react";

export default function PublicLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      {/* 1. TOP HEADER (Promo Bar) */}
      <div className="bg-black text-white py-3 text-center text-sm">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <Link to="/shop" className="font-bold underline ml-2">
            ShopNow
          </Link>
        </p>
      </div>

      {/* 2. NAVBAR */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 flex items-center justify-between py-5">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-tight text-black">
            Exclusive
          </Link>

          {/* Menu Links */}
          <div className="hidden md:flex gap-10">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/signup" className="hover:underline">
              Sign Up
            </Link>
          </div>

          {/* Search & Icons */}
          <div className="flex items-center gap-6">
            <div className="relative hidden lg:block">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="bg-[#F5F5F5] py-2 px-4 pr-10 rounded text-sm outline-none w-64"
              />
              <LucideSearch
                className="absolute right-3 top-2 text-gray-500"
                size={18}
              />
            </div>
            <div className="flex gap-4 text-black">
              <LucideHeart size={24} className="cursor-pointer" />
              <LucideShoppingCart size={24} className="cursor-pointer" />
              <LucideUser size={24} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </nav>

      {/* 3. MAIN CONTENT (Halaman Error atau Produk masuk di sini) */}
      <main className="flex-1">{children}</main>

      {/* 4. FOOTER */}
      <footer className="bg-black text-white pt-20 pb-6">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Col 1 */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Exclusive</h3>
            <p className="font-medium">Subscribe</p>
            <p className="text-sm">Get 10% off your first order</p>
            <div className="border border-white flex items-center p-2 rounded">
              <input
                type="text"
                placeholder="Enter your email"
                className="bg-transparent text-sm outline-none w-full"
              />
              <span className="cursor-pointer">➤</span>
            </div>
          </div>
          {/* Col 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Support</h3>
            <p className="text-sm text-gray-300">
              Jl. Gatot Subroto, Jakarta, 12930, Indonesia.
            </p>
            <p className="text-sm text-gray-300">exclusive@gmail.com</p>
            <p className="text-sm text-gray-300">+62815-8888-9999</p>
          </div>
          {/* Col 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Account</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
            </ul>
          </div>
          {/* Col 4 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Link</h3>
            <ul className="text-sm text-gray-300 space-y-2">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* Col 5 */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Download App</h3>
            <p className="text-[10px] text-gray-400">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-2">
              <div className="bg-gray-800 w-20 h-20 flex items-center justify-center rounded">
                QR
              </div>
              <div className="space-y-2">
                <div className="bg-gray-800 w-24 h-9 rounded"></div>
                <div className="bg-gray-800 w-24 h-9 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © Copyright Lumoshive 2026. All rights reserved
        </div>
      </footer>
    </div>
  );
}
