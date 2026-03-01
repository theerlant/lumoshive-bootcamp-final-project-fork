import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";
import UserCard from "./UserCard";
import {
  LucideClipboardList,
  LucideFileText,
  LucideHome,
  LucideImage,
  LucideLayers,
  LucideMegaphone,
  LucidePackage,
  LucideStar,
} from "lucide-react";

export default function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sticky top-0 left-0 flex flex-col gap-4 w-60 min-h-screen bg-white">
      <div className="bg-black text-white p-4">
        <UserCard
          avatarUrl="https://i.pravatar.cc/300"
          name="Theerlan"
          email="contoh@gmail.com"
          userRole="admin"
        />
      </div>
      <NavItem
        icon={<LucideHome />}
        title="Home"
        active={
          currentPath.split("/")[1] === "admin" &&
          currentPath.split("/").length === 2
        }
        href="/admin"
      />
      <NavItem
        icon={<LucideFileText />}
        title="Products"
        active={currentPath.split("/")[2] === "products"}
        href="/admin/products"
      />
      <NavItem
        icon={<LucideLayers />}
        title="Categories"
        active={currentPath.split("/")[2] === "categories"}
        href="/admin/categories"
      />
      <NavItem
        icon={<LucideClipboardList />}
        title="Orders"
        active={currentPath.split("/")[2] === "orders"}
        href="/admin/orders"
      />
      <NavItem
        icon={<LucideMegaphone />}
        title="Promotions"
        active={currentPath.split("/")[2] === "promotions"}
        href="/admin/promotions"
      />
      <NavItem
        icon={<LucideImage />}
        title="Banners"
        active={currentPath.split("/")[2] === "banners"}
        href="/admin/banners"
      />
      <NavItem
        icon={<LucideStar />}
        title="Ratings"
        active={currentPath.split("/")[2] === "ratings"}
        href="/admin/ratings"
      />
      <NavItem
        icon={<LucidePackage />}
        title="Stock"
        active={currentPath.split("/")[2] === "stocks"}
        href="/admin/stocks"
      />
    </aside>
  );
}
