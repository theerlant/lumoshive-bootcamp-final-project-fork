import { Outlet } from "react-router-dom";
import gambar_admin from "../../assets/gambar_admin.png";

export default function AdminAuthLayout() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-6 font-poppins">
      <div className="bg-white rounded-[40px] shadow-sm flex max-w-[1000px] w-full overflow-hidden min-h-[600px]">
        {/* ini flex di sisi kiri */}
        <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
          <Outlet />
        </div>

        {/* ini sisi kanan */}
        <div className="hidden md:flex w-1/2 bg-[#DB4444] p-12 flex-col justify-center text-white relative overflow-hidden px- py-70 mx-2 my-2 rounded-[32px]">
          <div className="relative z-10">
            <h2 className="text-4xl font-semibold leading-tight mb-0 -mt-60">
              Very good works are waiting for you Sign up Now
            </h2>
            {/* ini garis putih */}
            <div className="w-1 h-35 bg-white/40 rounded-full mt-10"></div>
          </div>

          <img
            // src="/path-ke-gambar-wanita.png"
            src={gambar_admin}
            alt="Admin Banner"
            // className="absolute bottom-0 right-0 h-[85%] object-contain py-0 px-9"
            className="absolute bottom-[-20px] right-0 h-[85%] object-contain px-9"
          />

          {/* Garis putih bawah*/}
          <div className="w-20 h-1 bg-white opacity-40 rounded-full translate-y-55"></div>
        </div>
      </div>
    </div>
  );
}
