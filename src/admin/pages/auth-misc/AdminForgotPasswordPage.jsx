import { useState, useRef, useEffect } from "react";
import { AuthService } from "../../../shared/services/authService";
import { InputField, InputLabel } from "../../components/InputField";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../../../shared/schema/authSchema";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

export const AdminForgotPasswordPage = () => {
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
      .then(() => {
        resetForm.setValue("email", data.email);
        setForgotSuccess(true);
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
          navigate("/admin/auth/login", {
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
    <div className="w-full text-center">
      <h1 className="font-bold text-2xl">
        {!forgotSuccess ? "Forgot password?" : "Reset password"}
      </h1>
      <p className="text-[#89868D] text-sm mb-8">
        {!forgotSuccess
          ? "No worries, we’ll send you reset instruction."
          : "Please enter the OTP sent to your email and your new password."}
      </p>

      {apiError && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg flex items-center gap-2 text-sm text-left">
          <AlertCircle size={16} className="shrink-0" />
          <p>{apiError}</p>
        </div>
      )}

      {!forgotSuccess ? (
        <form
          className="text-left space-y-4"
          onSubmit={forgotForm.handleSubmit(handleForgotPasswordSubmit)}
        >
          <div>
            <InputLabel htmlFor="email" text="Email" />
            <InputField
              id="email"
              placeholder="Enter your email"
              {...forgotForm.register("email")}
            />
            {forgotForm.formState.errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {forgotForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex justify-stretch *:w-full">
            <Button type="submit" disabled={forgotForm.formState.isSubmitting}>
              {forgotForm.formState.isSubmitting ? "Sending..." : "Send Email"}
            </Button>
          </div>

          <div className="text-center mt-4 pt-4">
            <Link
              to="/admin/auth/login"
              className="text-sm text-[#DB4444] hover:underline"
            >
              Back to log in
            </Link>
          </div>
        </form>
      ) : (
        <form
          className="text-left space-y-4"
          onSubmit={resetForm.handleSubmit(handleResetPasswordSubmit)}
        >
          <div>
            <InputLabel htmlFor="otp" text="OTP" />
            <div className="grid grid-cols-6 gap-1 mt-1 mb-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  className={`text-center flex px-4 py-3 text-sm bg-gray-50 outline focus:outline-[#DB4444] focus:outline-1 outline-gray-200 rounded-lg`}
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
            <InputLabel htmlFor="password" text="New Password" />
            <InputField
              id="password"
              type="password"
              placeholder="Enter new password"
              {...resetForm.register("password")}
            />
            {resetForm.formState.errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {resetForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="pt-2 *:w-full">
            <Button type="submit" disabled={resetForm.formState.isSubmitting}>
              {resetForm.formState.isSubmitting
                ? "Resetting..."
                : "Reset Password"}
            </Button>
          </div>

          <div className="text-center mt-4 pt-4">
            <button
              type="button"
              onClick={() => {
                setForgotSuccess(false);
                setApiError(null);
              }}
              className="text-sm font-semibold text-[#DB4444] hover:underline hover:cursor-pointer"
            >
              Didn't receive code? Try again
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
