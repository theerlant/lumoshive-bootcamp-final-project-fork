import Button from "../../components/Button";
import React, { useState } from "react";
import { InputField, InputLabel } from "../../components/InputField";
import { IconButton } from "../../components/IconButton";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { registerSchema } from "../../../shared/schema/authSchema";
import { AuthService } from "../../../shared/services/authService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AdminSignupPage() {
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [apiError, setApiError] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data) => {
    setApiError(null);
    AuthService.register(data)
      .then(() => {
        sessionStorage.setItem("verifyEmail", data.email);
        navigate("/admin/auth/otp");
      })
      .catch((error) => {
        if (error.message === "email already registered") {
          setApiError("This email address is already registered.");
        } else {
          setApiError(error.message || "An error occurred during sign up");
        }
      });
  };

  return (
    <div className="flex flex-col my-6">
      <h1 className="text-2xl font-bold mb-2">Sign up</h1>
      <p className="text-gray-400 text-sm mb-6">
        Start your 30-day free trial.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <InputLabel text="Full Name" htmlFor="fullname"></InputLabel>
          <InputField
            id="fullname"
            type="text"
            placeholder="John Doe"
            {...register("fullname")}
          />
          {errors.fullname && (
            <p className="text-red-500 text-xs mt-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        <div>
          <InputLabel text="Email Address" htmlFor="email" />
          <InputField
            id="email"
            type="email"
            placeholder="Email Address"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <InputLabel text="Password" htmlFor="password" />
          <InputField
            id="password"
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
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

        {apiError && (
          <p className="text-red-500 text-sm text-center">{apiError}</p>
        )}

        <div className="place-self-center pt-4">
          <Button variant="primary" type="submit">
            Get started
          </Button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-500">
          Already a member?{" "}
          <a href="/admin/auth/login" className="text-[#DB4444] font-medium">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
