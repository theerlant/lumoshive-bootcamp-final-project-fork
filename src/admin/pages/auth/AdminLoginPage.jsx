import Button from "../../components/Button";
import { useState } from "react";
import { AuthService } from "../../../shared/services/authService";
import { InputLabel, InputField } from "../../components/InputField";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../shared/features/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "../../components/IconButton";
import { loginSchema } from "../../../shared/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AdminLoginPage() {
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [apiError, setApiError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { message } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    setApiError(null);
    AuthService.login(data)
      .then((response) => {
        console.log(response);
        if (response.data) {
          dispatch(
            setCredentials({
              user: response.data.data.user,
              accessToken: response.data.data.access_token,
              refreshToken: response.data.data.refresh_token,
            }),
          );
          navigate("/admin");
        }
      })
      .catch((error) => {
        if (
          error.response.data.message ===
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
        navigate("/admin/auth/otp");
      })
      .catch((error) => {
        setApiError(error.message || "An error occured during login");
      });
  };

  return (
    <div className="flex flex-col my-6">
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      <p className="text-gray-400 text-sm mb-6">Get into your account</p>

      <form className="space-y-6 mb-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputLabel htmlFor="email" text="Email" />
          <InputField
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <InputLabel htmlFor="password" text="Password" />
          <InputField
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder={passwordVisible ? "supersecret" : "●●●●●●●●"}
            {...register("password")}
            actions={
              <IconButton
                size="small"
                onClick={() => setPasswordVisibility((prev) => !prev)}
                type="button"
              >
                {passwordVisible ? <LucideEyeOff /> : <LucideEye />}
              </IconButton>
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {message && (
          <p className="text-green-600 text-sm text-center">{message}</p>
        )}

        {apiError && (
          <p className="text-red-500 text-sm text-center">{apiError}</p>
        )}

        <div className="text-right">
          <a href="/admin/auth/forgot" className="text-[#DB4444] text-sm">
            Forgot password?
          </a>
        </div>

        <div className="place-self-center">
          <Button type="submit" variant="primary">
            Sign in
          </Button>
        </div>
      </form>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/admin/auth/register" className="text-[#DB4444] font-medium">
          Sign up
        </a>
      </p>
    </div>
  );
}
