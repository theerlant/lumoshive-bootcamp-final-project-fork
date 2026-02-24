import Button from "../../components/Button";
import React, { useState } from "react";
import axios from "axios";

export default function AdminSignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          name: name,
          email: email,
          password: password,
        },
      );

      console.log("Response dari backend:", response.data);
      alert("Sign up berhasil! Data dikirim ke backend.");
    } catch (error) {
      console.error("Error saat sign up:", error);
      alert("Sign up gagal!" + error.message);
    }
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">Sign up</h1>
      <p className="text-gray-400 text-sm mb-8">
        Start your 30-day free trial.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DB4444]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DB4444]"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DB4444]"
          />
          <span className="absolute right-4 top-10 text-gray-400 cursor-pointer flex gap-1"></span>
        </div>

        <div className="pt-2">
          <Button variant="primary" className="w-full" type="submit">
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

//bagian bawah cuman latihan dihapus juga gapapa
// signuppakaiaxios
// import React, { useState } from "react";
// import axios from "axios";

// function SignupForm() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Kirim data ke backend dummy API
//       const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
//         name: name,
//         email: email,
//         password: password,
//       });

//       console.log("Response dari backend:", response.data);
//       alert("Sign up berhasil! Data dikirim ke backend.");
//     } catch (error) {
//       console.error("Error saat sign up:", error);
//       alert("Sign up gagal!");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//       <input
//         type="text"
//         placeholder="Full Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <input
//         type="email"
//         placeholder="Email Address"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="border p-2 rounded"
//       />
//       <input
//         type="password"
//         placeholder="Password"
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

// export default SignupForm;
