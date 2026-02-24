import { Outlet, useNavigate } from "react-router-dom";
import gambar_admin from "../../assets/gambar_admin.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AdminAuthLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user.role === "admin") {
      navigate("/admin");
    }
  }, [isAuthenticated, user]);

  return (
    <div className="flex justify-center items-center lg:h-screen lg:p-28 xl:px-64 bg-[#F5F5F5] font-poppins">
      <div className=" bg-white lg:rounded-[40px] flex flex-col-reverse lg:flex-row items-center lg:justify-center shadow-sm w-full h-full overflow-hidden lg:p-2">
        {/* ini flex di sisi kiri */}
        <div className="w-full lg:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <Outlet />
        </div>

        {/* ini sisi kanan */}
        <div className="flex flex-col w-full lg:w-1/2 lg:h-full relative bg-[#DB4444] pb-0 p-12 text-white overflow-hidden rounded-b-[32px] lg:rounded-t-[32px]">
          <h2 className="text-2xl md:text-4xl lg:text-4xl text-center lg:text-left font-semibold leading-tight mb-0 mt-0">
            Very good works are waiting for you. Sign up Now
          </h2>
          {/* Ternyata garis nya bikin susah bang @ wkwkwk */}
          <img
            src={gambar_admin}
            alt="Admin Banner"
            // className="absolute bottom-0 right-0 h-[85%] object-contain py-0 px-9"
            className="lg:translate-x-8 max-h-100 lg:h-[90%] object-contain lg:object-cover"
          />
        </div>
      </div>
    </div>
  );
}
