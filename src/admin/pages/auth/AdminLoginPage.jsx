import Button from "../../components/Button";
import { useState } from "react";
import { AuthService } from "../../../shared/services/authService";
import { InputLabel, InputField } from "../../components/InputField";
import { LucideEye, LucideEyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../../shared/features/authSlice";
import { useNavigate } from "react-router-dom";
import { IconButton } from "../../components/IconButton";
import { loginSchema } from "../../../shared/schema/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AdminLoginPage() {
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [apiError, setApiError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      .then((data) => {
        if (data) {
          dispatch(
            setCredentials({
              user: data.user,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
            }),
          );
          navigate("/admin");
        }
      })
      .catch((error) => {
        console.error(error);
        setApiError(error.message || "An error occurred during login");
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

//bagian bawah hanya latihan, dihapus juga gapapa
//Jika login ga pakai axios

// import React, { useState } from "react";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault(); // cegah reload halaman

//     try {
//       // Kirim data ke backend dummy API
//       const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       });

//       const data = await response.json();
//       console.log("Response dari backend:", data);

//       // Misalnya kalau login berhasil
//       alert("Login berhasil! Data dikirim ke backend.");
//     } catch (error) {
//       console.error("Error saat login:", error);
//       alert("Login gagal!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <input
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
//       >
//         Get Started
//       </button>
//     </form>
//   );
// }

// export default LoginForm;

//jika pakai axios
// import React, { useState } from "react";
// import axios from "axios";

// function LoginForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Kirim data ke backend dummy API
//       const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
//         email: email,
//         password: password,
//       });

//       console.log("Response dari backend:", response.data);
//       alert("Login berhasil! Data dikirim ke backend.");
//     } catch (error) {
//       console.error("Error saat login:", error);
//       alert("Login gagal!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <input
//         type="password"
//         placeholder="Enter your password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <button
//         type="submit"
//         className="bg-red-500 text-white py-2 rounded hover:bg-red-600"
//       >
//         Get Started
//       </button>
//     </form>
//   );
// }

// export default LoginForm;
