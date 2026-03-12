import { Link } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";
import { Button } from "../../components/Button";

export const PublicLoginPage = () => {
  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">
        Log in to Exclusive
      </h1>
      <p>Enter your details below</p>
      <form className="mt-12 flex flex-col gap-8">
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
        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-end lg:items-center gap-4">
          <div className="*:self-stretch *:lg:self-auto">
            <Button>Log In</Button>
          </div>
          <Link
            to="./forgot"
            className="text-[#DB4444] hover:underline hover:cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};
