import { Outlet } from "react-router-dom";
import sideImage from "@/assets/auth_sider_transparent.png";

export const PublicAuthLayout = () => {
  return (
    <div className="grid lg:grid-cols-2 min-h-[800px]">
      <aside className="hidden lg:flex bg-linear-to-b from-[#cde5e9] to-[#d1e6eb] h-full items-center justify-center">
        <img src={sideImage} className="object-cover aspect-square w-full" />
      </aside>
      <main className="flex flex-col items-center lg:justify-center px-8 md:px-24 lg:px-24 py-8">
        <Outlet />
      </main>
    </div>
  );
};
