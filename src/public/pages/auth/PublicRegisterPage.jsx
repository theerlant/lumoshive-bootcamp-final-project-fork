import { Link, useNavigate } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../../shared/schema/authSchema";
import { AuthService } from "../../../shared/services/authService";

export const PublicRegisterPage = () => {
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    setApiError(null);
    AuthService.register({
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    })
      .then(() => {
        sessionStorage.setItem("verifyEmail", data.email);
        navigate("/auth/otp");
      })
      .catch((error) => {
        if (error.response.data.message === "email already registered") {
          setApiError("This email address is already registered.");
        } else {
          setApiError(
            error.response.data.message || "An error occurred during sign up",
          );
        }
      });
  };

  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">
        Create an account
      </h1>
      <p>Enter your details below</p>

      {apiError && <p className="text-red-500 text-sm mt-4">{apiError}</p>}

      <form
        className="mt-8 mb-4 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <AuthInputField
            className="outline-0 border-b py-2 w-full"
            id="fullname"
            placeholder="Name"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <AuthInputField
            className="outline-0 border-b py-2 w-full"
            id="email"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <AuthInputField
            className="outline-0 border-b py-2 w-full"
            id="password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#DB4444] text-white py-4 px-12 rounded-sm hover:cursor-pointer disabled:bg-[#f28b8b] disabled:cursor-not-allowed mt-4"
        >
          {isSubmitting ? "Creating Account..." : "Create Account"}
        </button>
      </form>
      <span>
        <span className="opacity-70">Already have an account? </span>
        <Link to="/auth" className="hover:underline font-medium">
          Log In
        </Link>
      </span>
    </div>
  );
};
