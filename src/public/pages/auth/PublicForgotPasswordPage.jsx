import { Link } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";

export const PublicForgotPasswordPage = () => {
  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">Forgot Password?</h1>
      <p>No worries, we’ll send you reset instruction.</p>
      <form className="mt-12 mb-8 flex flex-col gap-8">
        <AuthInputField
          className="outline-0 border-b py-2 w-full"
          name="email"
          id="email"
          placeholder="Email or Phone Number"
        />
        <button className="bg-[#DB4444] text-white py-4 px-12 rounded-sm hover:cursor-pointer self-stretch lg:self-auto">
          Send Email
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
