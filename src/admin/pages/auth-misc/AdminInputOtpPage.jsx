import { useEffect, useRef, useState } from "react";
import { InputField } from "../../components/InputField";
import Button from "../../components/Button";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { otpSchema } from "../../../shared/schema/authSchema";
import z from "zod";
import { AuthService } from "../../../shared/services/authService";
import { useDispatch } from "react-redux";

export const AdminInputOTPPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState(null);

  // kembali ke login jika OTP diakses tanpa email
  useEffect(() => {
    const verifyEmail = sessionStorage.getItem("verifyEmail");

    if (!verifyEmail) {
      console.warn(
        "No verify email found in session storage, redirecting to login...",
      );
      // Use an absolute path to be safe
      navigate("/admin/auth/login", { replace: true });
    } else {
      setEmail(verifyEmail);
      setLoaded(true);
    }
  }, [navigate]);

  const [otp, setOTP] = useState(Array.from({ length: 6 }).fill(""));
  const inputRefs = useRef([]);

  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState(null);

  // perubahan per otp input
  const handleChange = (field, index) => {
    if (isNaN(field.value)) return;

    setOTP(otp.with(Number(field.name), field.value));

    if (field.value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // auto focus next/prev setiap keypress
  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // form submit handle
  const handleSubmit = (event) => {
    event.preventDefault();

    const result = otpSchema.safeParse({ email, otp: otp.join("") });
    if (result.success) {
      AuthService.verifyOtp(result.data)
        .then((data) => {
          // auto login dengan data otentikasi
          dispatch(
            setCredentials({
              user: data.user,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            }),
          );
        })
        .catch((error) => setErrors([error]));
    } else {
      setErrors(result.error.issues);
    }
  };

  const otpError = errors.find((err) => err.path.includes("otp"))?.message;

  if (!loaded) return null;

  return (
    <div className="w-full text-center">
      <h1 className="font-bold text-2xl mb-1">Input OTP</h1>
      <p className="text-[#89868D] text-sm">
        We've send you a one time password (OTP) to your email
      </p>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-6 gap-1 mt-8 mb-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <input
              className={`text-center flex px-4 py-3 text-sm bg-gray-50 outline focus:outline-[#DB4444] focus:outline-1 outline-gray-200 rounded-lg`}
              key={i}
              name={i.toString()}
              type="text"
              maxLength={1}
              value={otp[i]}
              ref={(el) => (inputRefs.current[i] = el)}
              onChange={(e) => handleChange(e.target, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
        {otpError ? (
          <p className="text-red-500 text-xs mt-1">{otpError}</p>
        ) : null}
        <div className="flex flex-col w-full items-stretch mt-2">
          <Button type="submit">Send OTP</Button>
        </div>
      </form>
      <div className="mt-8">
        <Link
          className="text-sm text-[#DB4444] hover:underline pt-8"
          to={"../login"}
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};
