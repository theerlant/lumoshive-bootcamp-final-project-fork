import { Link } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";

export const PublicOTPPage = () => {
  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">Input OTP</h1>
      <p>we send you one time password (OTP) on the email.</p>
      <form className="mt-12 mb-8 flex flex-col gap-8">
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <AuthInputField
              className="outline-0 border-b py-2 w-full text-center"
              key={i}
              name={i.toString()}
              type="text"
              maxLength={1}
            />
          ))}
        </div>
        <button className="bg-[#DB4444] text-white py-4 px-12 rounded-sm hover:cursor-pointer self-stretch lg:self-auto">
          Submit OTP
        </button>
      </form>
      <span className="flex w-full justify-center">
        <Link to=".." className="text-[#DB4444] hover:underline ">
          Back to Login
        </Link>
      </span>
    </div>
  );
};
