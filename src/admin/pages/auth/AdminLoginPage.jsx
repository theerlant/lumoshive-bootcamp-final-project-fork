import Button from "../../components/Button";
import { useState } from "react";
import axios from "axios";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          email: email,
          password: password,
        },
      );
      //console.log("Response dari backend:", response.data);
      alert("Login berhasil! Data dikirim ke backend.");
    } catch (error) {
      //console.error("Error saat login:", error);
      alert("Login gagal!" + error.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Login</h1>
      <p className="text-gray-400 text-sm mb-8">How do i get started ?</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DB4444]"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#DB4444]"
          />
        </div>

        <div className="text-right">
          <a href="#" className="text-[#DB4444] text-sm">
            Forgot password?
          </a>
        </div>

        <Button variant="primary" className="w-full" type="submit">
          Sign in
        </Button>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <a href="/admin/auth/register" className="text-[#DB4444] font-medium">
            Sign up
          </a>
        </p>
      </form>
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
