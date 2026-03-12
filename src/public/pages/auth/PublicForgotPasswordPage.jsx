import { Link } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema } from "../../../shared/schema/authSchema";
import { AuthService } from "../../../shared/services/authService";

export const PublicForgotPasswordPage = () => {
  const [apiError, setApiError] = useState(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data) => {
    setApiError(null);
    AuthService.forgotPassword(data.email)
      .then((res) => {
        if (res.success !== false) {
          setSuccess(true);
        } else {
          setApiError(res.message || "Failed to send reset instruction");
        }
      })
      .catch((error) => {
        setApiError(
          error?.response?.data?.message ||
            error.message ||
            "An error occurred",
        );
      });
  };

  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">Forgot Password?</h1>
      <p>No worries, we’ll send you reset instruction.</p>

      {apiError && <p className="text-red-500 text-sm mt-4">{apiError}</p>}

      {success && (
        <p className="text-green-600 text-sm mt-4">
          Reset instruction sent to your email. Check your inbox and follow the
          link or use the OTP to reset your password.
        </p>
      )}

      <form
        className="mt-8 mb-8 flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <AuthInputField
            className="outline-0 border-b py-2 w-full"
            id="email"
            placeholder="Email Address"
            disabled={success}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || success}
          className="bg-[#DB4444] text-white py-4 px-12 rounded-sm hover:cursor-pointer self-stretch lg:self-auto disabled:bg-[#f28b8b] disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Email"}
        </button>
      </form>
      <span className="flex w-full justify-center">
        <Link to="/auth" className="text-[#DB4444] hover:underline ">
          Back to Login
        </Link>
      </span>
    </div>
  );
};
