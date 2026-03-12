import { Link } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";

export const PublicRegisterPage = () => {
  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">
        Create an account
      </h1>
      <p>Enter your details below</p>
      <form className="mt-12 mb-4 flex flex-col gap-8">
        <AuthInputField
          className="outline-0 border-b py-2 w-full"
          name="name"
          id="name"
          placeholder="Name"
        />
        <AuthInputField
          className="outline-0 border-b py-2 w-full"
          name="email"
          id="email"
          placeholder="Email or Phone Number"
        />
        <AuthInputField
          className="outline-0 border-b py-2 w-full"
          name="password"
          id="password"
          type="password"
          placeholder="Password"
        />
        <button
          type="submit"
          className="bg-[#DB4444] text-white py-4 px-12 rounded-sm hover:cursor-pointer"
        >
          Create Account
        </button>
      </form>
      <span>
        <span className="opacity-70">Already have an account? </span>
        <Link to=".." className="hover:underline">
          Log In
        </Link>
      </span>
    </div>
  );
};
