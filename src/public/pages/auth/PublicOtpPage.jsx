import { Link, useNavigate } from "react-router-dom";
import { AuthInputField } from "../../components/AuthInputField";
import { useState, useRef, useEffect } from "react";
import { AuthService } from "../../../shared/services/authService";
import { otpSchema } from "../../../shared/schema/authSchema";

export const PublicOTPPage = () => {
  const navigate = useNavigate();

  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState(null);
  const [apiError, setApiError] = useState(null);

  // kembali ke login jika OTP diakses tanpa email
  useEffect(() => {
    const verifyEmail = sessionStorage.getItem("verifyEmail");

    if (!verifyEmail) {
      console.warn(
        "No verify email found in session storage, redirecting to login...",
      );
      navigate("/auth", { replace: true });
    } else {
      setEmail(verifyEmail);
      setLoaded(true);
    }
  }, [navigate]);

  const [otpArray, setOtpArray] = useState(Array.from({ length: 6 }).fill(""));
  const inputRefs = useRef([]);
  const [errors, setErrors] = useState([]);

  // OTP interactions
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setApiError(null);
    setErrors([]);

    const result = otpSchema.safeParse({ email, otp: otpArray.join("") });
    if (result.success) {
      AuthService.verifyOtp(result.data)
        .then(() => {
          sessionStorage.removeItem("verifyEmail"); // Cleanup
          navigate("/", { replace: true });
        })
        .catch((error) =>
          setApiError(
            error?.response?.data?.message ||
              error.message ||
              "Failed to verify OTP",
          ),
        );
    } else {
      setErrors(result.error.issues);
    }
  };

  const otpError = errors.find((err) => err.path.includes("otp"))?.message;

  if (!loaded) return null;

  return (
    <div className="w-full">
      <h1 className="font-title font-medium text-4xl mb-4">Input OTP</h1>
      <p>we send you one time password (OTP) on the email.</p>

      {apiError && <p className="text-red-500 text-sm mt-4">{apiError}</p>}

      <form className="mt-8 mb-8 flex flex-col gap-6" onSubmit={handleSubmit}>
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
        {otpError && (
          <p className="text-red-500 text-xs text-center">{otpError}</p>
        )}
        <button
          type="submit"
          className="bg-[#DB4444] text-white py-4 px-12 rounded-sm hover:cursor-pointer self-stretch lg:self-auto mt-2 disabled:bg-[#f28b8b] disabled:cursor-not-allowed"
        >
          Submit OTP
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
