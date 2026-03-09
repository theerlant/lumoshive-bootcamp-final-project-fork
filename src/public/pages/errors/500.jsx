import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

export default function ServerErrorPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-20">
        <nav className="text-sm text-gray-500 mb-20">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">500 Error</span>
        </nav>

        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-7xl font-medium text-black mb-6">
            500 Server Error
          </h1>
          <p className="text-base text-gray-700 mb-10">
            Whoops! Something went wrong on our end. Please try again later.
          </p>
          
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-[#c03939] transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    </PublicLayout>
  );
}