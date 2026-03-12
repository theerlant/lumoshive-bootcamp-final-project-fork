import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-20">
        <Link to="/" className="hover:underline">
          Home
        </Link>
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

        <Button onClick={() => navigate("/")}>Back to home page</Button>
      </div>
    </div>
  );
}
