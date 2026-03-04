import { Outlet } from "react-router-dom";

// Layout forgot password & OTP
export default function AdminAuthMiscLayout() {
  return (
    <div className="flex w-screen h-screen items-center justify-center bg-[#F4F5F9]">
      <div className="flex flex-col justify-center items-center min-w-1/2 max-w-3/4 h-3/4 bg-white drop-shadow-[0_0_4px_0_#00000026] rounded-4xl overflow-auto">
        <div className="w-1/2 h-full flex flex-col justify-center">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
