import { Link, useNavigate } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";
import { Button } from "../../components/Button";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../../shared/schema/authSchema";
import { AuthService } from "../../../shared/services/authService";

export const PublicForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // OTP split input state and refs
  const [otpArray, setOtpArray] = useState(Array.from({ length: 6 }).fill(""));
  const inputRefs = useRef([]);

  const forgotForm = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "", otp: "", password: "" },
  });

  // Sync otpArray -> react-hook-form
  useEffect(() => {
    resetForm.setValue("otp", otpArray.join(""));
  }, [otpArray, resetForm]);

  const handleForgotPasswordSubmit = (data) => {
    setApiError(null);
    AuthService.forgotPassword(data.email)
      .then((res) => {
        if (res.success !== false) {
          resetForm.setValue("email", data.email);
          setForgotSuccess(true);
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

  const handleResetPasswordSubmit = (data) => {
    setApiError(null);
    AuthService.resetPassword(data.email, data.otp, data.password)
      .then((res) => {
        if (res.success !== false) {
          navigate("/auth", {
            state: { message: "Password reset successfully. Please login." },
          });
        } else {
          setApiError(res.message || "Failed to reset password");
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

  // OTP Change Handlers
  const handleOtpChange = (field, index) => {
    if (isNaN(field.value)) return;

    setOtpArray(otpArray.with(Number(field.name), field.value));

    if (field.value && index < otpArray.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otpArray[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">
        {!forgotSuccess ? "Forgot Password?" : "Reset Password"}
      </h1>
      <p>
        {!forgotSuccess
          ? "No worries, we’ll send you reset instruction."
          : "Please enter the OTP sent to your email and your new password."}
      </p>

      {apiError && <p className="text-red-500 text-sm mt-4">{apiError}</p>}

      {!forgotSuccess ? (
        <form
          className="mt-8 mb-8 flex flex-col gap-6"
          onSubmit={forgotForm.handleSubmit(handleForgotPasswordSubmit)}
        >
          <div>
            <AuthInputField
              className="outline-0 border-b py-2 w-full"
              id="email"
              placeholder="Email or Phone Number"
              {...forgotForm.register("email")}
            />
            {forgotForm.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {forgotForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-end lg:items-center gap-4">
            <div className="*:self-stretch *:lg:self-auto">
              <Button
                type="submit"
                disabled={forgotForm.formState.isSubmitting}
              >
                {forgotForm.formState.isSubmitting
                  ? "Sending..."
                  : "Send Email"}
              </Button>
            </div>
            <Link to="/auth" className="text-[#DB4444] hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      ) : (
        <form
          className="mt-8 mb-8 flex flex-col gap-6"
          onSubmit={resetForm.handleSubmit(handleResetPasswordSubmit)}
        >
          <div>
            <label className="block text-sm font-medium mb-1">OTP</label>
            <div className="flex gap-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <AuthInputField
                  className="outline-0 border-b py-2 w-full text-center focus:border-[#DB4444]"
                  key={i}
                  name={i.toString()}
                  type="text"
                  maxLength={1}
                  value={otpArray[i]}
                  ref={(el) => (inputRefs.current[i] = el)}
                  onChange={(e) => handleOtpChange(e.target, i)}
                  onKeyDown={(e) => handleOtpKeyDown(e, i)}
                />
              ))}
            </div>
            {resetForm.formState.errors.otp && (
              <p className="text-red-500 text-xs mt-1">
                {resetForm.formState.errors.otp.message}
              </p>
            )}
          </div>

          <div>
            <AuthInputField
              className="outline-0 border-b py-2 w-full"
              id="password"
              type="password"
              placeholder="New Password"
              {...resetForm.register("password")}
            />
            {resetForm.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {resetForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="flex flex-col items-stretch gap-4 mt-2">
            <button
              type="button"
              onClick={() => {
                setForgotSuccess(false);
                setApiError(null);
                navigate(0);
              }}
              className="text-sm font-semibold text-[#DB4444] hover:underline"
            >
              Didn't receive code? Try again
            </button>
            <Button type="submit" disabled={resetForm.formState.isSubmitting}>
              {resetForm.formState.isSubmitting
                ? "Resetting..."
                : "Reset Password"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
