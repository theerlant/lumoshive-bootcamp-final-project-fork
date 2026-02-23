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
  return (
    <div className="flex flex-col gap-4 w-60">
      <div className="bg-black text-white p-4">
        <UserCard
          avatarUrl="https://i.pravatar.cc/300"
          name="Theerlan"
          email="contoh@gmail.com"
        />
      </div>
      <NavItem icon={<LucideHome />} title="Home" active href="#" />
      <NavItem icon={<LucideFileText />} title="Products" href="#" />
      <NavItem icon={<LucideLayers />} title="Categories" href="#" />
      <NavItem icon={<LucideClipboardList />} title="Orders" href="#" />
      <NavItem icon={<LucideMegaphone />} title="Promotions" href="#" />
      <NavItem icon={<LucideImage />} title="Banners" href="#" />
      <NavItem icon={<LucideStar />} title="Ratings" href="#" />
      <NavItem icon={<LucidePackage />} title="Stock" href="#" />
    </div>
  );
}
