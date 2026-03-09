import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../../layouts/PublicLayout";

export default function NotFoundPage() {
  return (
    <PublicLayout>
      <div className="container mx-auto px-4 py-20">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-20">
          <Link to="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-black">404 Error</span>
        </nav>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="text-8xl font-medium tracking-widest text-black mb-6">
            404 Not Found
          </h1>
          <p className="text-base text-gray-700 mb-10">
            Your visited page not found. You may go home page.
          </p>
          
          <Link 
            to="/" 
            className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-[#c03939] transition-colors"
          >
            Back to home page
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
}