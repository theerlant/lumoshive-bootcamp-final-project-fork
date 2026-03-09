import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

export default function UnauthorizedPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-20">
        <nav className="text-sm text-gray-500 mb-20">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">401 Unauthorized</span>
        </nav>

        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-7xl font-medium text-black mb-6">
            401 Unauthorized
          </h1>
          <p className="text-base text-gray-700 mb-10">
            You don't have permission to access this page. Please login first.
          </p>
          
          <Link 
            to="/login" 
            className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-[#c03939] transition-colors"
          >
            Login Now
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}