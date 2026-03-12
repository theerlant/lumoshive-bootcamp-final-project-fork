import { Outlet } from "react-router-dom";
import sideImage from "@/assets/auth_sider.png";

export const PublicAuthLayout = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <img src={sideImage} className="object-cover" />
      <div className="flex flex-col items-center justify-center">
        <Outlet />
      </div>
    </div>
  );
};
