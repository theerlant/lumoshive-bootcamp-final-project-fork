import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";
import { Button } from "../../components/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../../shared/schema/authSchema";
import { AuthService } from "../../../shared/services/authService";
import { setCredentials } from "../../../shared/features/authSlice";

export const PublicLoginPage = () => {
  const [apiError, setApiError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    setApiError(null);
    AuthService.login(data)
      .then((response) => {
        if (response.data) {
          dispatch(
            setCredentials({
              user: response.data.data.user,
              accessToken: response.data.data.access_token,
              refreshToken: response.data.data.refresh_token,
            }),
          );
          navigate("/");
        }
      })
      .catch((error) => {
        if (
          error.response?.data?.message ===
          "account is not active. Please verify your email first"
        ) {
          onUnverifiedEmail(data.email);
        } else {
          setApiError(error.message || "An error occurred during login");
        }
      });
  };

  const onUnverifiedEmail = (email) => {
    AuthService.resendOtp(email)
      .then(() => {
        sessionStorage.setItem("verifyEmail", email);
        navigate("/auth/otp");
      })
      .catch((error) => {
        setApiError(error.message || "An error occured during login");
      });
  };

  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">
        Log in to Exclusive
      </h1>
      <p>Enter your details below</p>

      {message && <p className="text-green-600 text-sm mt-4">{message}</p>}

      {apiError && <p className="text-red-500 text-sm mt-4">{apiError}</p>}

      <form
        className="mt-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
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

        <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-end lg:items-center gap-4 mt-6">
          <div className="*:self-stretch *:lg:self-auto">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging In..." : "Log In"}
            </Button>
          </div>
          <Link
            to="/auth/forgot"
            className="text-[#DB4444] hover:underline hover:cursor-pointer"
          >
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};
